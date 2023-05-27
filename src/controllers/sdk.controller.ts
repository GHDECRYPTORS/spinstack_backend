import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import { User, UserDocument } from "../models/user.model";

const bcrypt = require("bcrypt");
const ethers = require("ethers");
const CryptoJS = require("crypto-js");
import { EthereumPrivateKeySignatureProvider } from "@requestnetwork/epk-signature";
import * as RequestNetwork from "@requestnetwork/request-client.js";
import { BusinessDocument } from "../models/business.model";

const getUserPk = async (userId: string): Promise<string> => {
  let user = (await User.findOne({
    id: userId,
  })) as BusinessDocument;

  const encrypted_pk = user.encrypted_pk;

  const decrypted = CryptoJS.AES.decrypt(
    encrypted_pk,
    process.env.ENCRYPTION_KEY
  );

  const privateKey = decrypted.toString(CryptoJS.enc.Utf8);
  return privateKey;
};

export const order = async function (req: Request, res: Response) {
  if (req.user == null) {
    return res.json({
      error: "no authorization",
      status: false,
    });
  }
  if (req.body.payer == null) {
    return res.json({
      error: "no payee sent",
      status: false,
    });
  }
  if (req.body.amountInWei == null || isNaN(req.body.amountInWei)) {
    return res.json({
      error: "invalid or no amount sent",
      status: false,
    });
  }

  const privateKey = await getUserPk(req.user.id);

  const wallet = new ethers.Wallet(privateKey);

  const payeeIdentity = {
    type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: wallet.address,
  };

  const payerIdentity = {
    type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: req.body.payer,
  };

  const requestNetwork = requestNetworkFromPK(privateKey);

  const requestInfo: RequestNetwork.Types.IRequestInfo = {
    currency: "ETH",
    expectedAmount: req.body.amountInWei,
    payee: payeeIdentity,
    payer: payerIdentity,
  };

  const addressBasedPaymentNetwork: RequestNetwork.Types.Payment.IPaymentNetworkCreateParameters =
    {
      id: RequestNetwork.Types.Extension.PAYMENT_NETWORK_ID.ERC20_ADDRESS_BASED,
      parameters: {
        paymentAddress: "0x92FC764853A9A0287b7587E59aDa47165b3B2675",
      },
    };
  const addressBasedCreateParams = {
    addressBasedPaymentNetwork,
    requestInfo,
    signer: payeeIdentity,
  };
  const request = await requestNetwork.createRequest(addressBasedCreateParams);
  console.log("Request created with erc20 address based payment network:");
  console.log(request);
  res.json({});
};

export const retrieveOrder = async function (req: Request, res: Response) {
  try {
    if (req.user == null) {
      return res.json({
        error: "no authorization",
        status: false,
      });
    }
    if (req.body.requestId == null) {
      return res.json({
        error: "no Request Id found",
        status: false,
      });
    }
    const privateKey = await getUserPk(req.user.id);
    const requestNetwork = requestNetworkFromPK(privateKey);
    const request = await requestNetwork.fromRequestId(req.body.requestId);
    const requestData = request.getData();
    console.log(requestData);
  } catch (err) {
    return res.json({ error: `${err}`, status: false });
  }

  return res.json({ "": "" });
};

const requestNetworkFromPK = (privateKey: string) => {
  const payeeSignatureInfo = {
    method: RequestNetwork.Types.Signature.METHOD.ECDSA,
    privateKey: privateKey,
  };

  const signatureProvider = new EthereumPrivateKeySignatureProvider(
    payeeSignatureInfo
  );

  const requestNetwork = new RequestNetwork.RequestNetwork({
    nodeConnectionConfig: {
      baseURL: "https://goerli.gateway.request.network/",
    },
    signatureProvider,
  });

  return requestNetwork;
};
