import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import { User, UserDocument } from "../models/user.model";

const bcrypt = require("bcrypt");
const ethers = require("ethers");
const CryptoJS = require("crypto-js");
import { EthereumPrivateKeySignatureProvider } from "@requestnetwork/epk-signature";
import * as RequestNetwork from "@requestnetwork/request-client.js";
import { BusinessDocument } from "../models/business.model";

const decryptPk = async (encrypted_pk: string): Promise<string> => {
  const decrypted = CryptoJS.AES.decrypt(
    encrypted_pk,
    process.env.ENCRYPTION_KEY
  );

  const privateKey = decrypted.toString(CryptoJS.enc.Utf8);
  return privateKey;
};

export const order = async function (req: Request, res: Response) {
  try {
    if (req.business == null) {
      return res.json({
        error: "no authorization",
        status: false,
      });
    }

    const privateKey = await decryptPk(req.business.encrypted_pk);

    const wallet = new ethers.Wallet(privateKey);

    const payeeIdentity = {
      type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: wallet.address,
    };

    const requestNetwork = requestNetworkFromPK(privateKey);

    const requestInfo: RequestNetwork.Types.IRequestInfo = {
      currency: "ETH",
      expectedAmount: req.body.amount_in_wei,
      payee: payeeIdentity,
    };

    const addressBasedPaymentNetwork: RequestNetwork.Types.Payment.IPaymentNetworkCreateParameters =
      {
        id: RequestNetwork.Types.Extension.PAYMENT_NETWORK_ID
          .ERC20_ADDRESS_BASED,
        parameters: {
          paymentAddress: "0x92FC764853A9A0287b7587E59aDa47165b3B2675",
        },
      };
    const addressBasedCreateParams = {
      addressBasedPaymentNetwork,
      requestInfo,
      signer: payeeIdentity,
    };
    const request = await requestNetwork.createRequest(
      addressBasedCreateParams
    );
    console.log("Request created with erc20 address based payment network:");
    console.log(request);
    res.json(request);
  } catch (err) {
    return res.json({ error: `${err}`, status: false });
  }
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
    const privateKey = await decryptPk(req.user.id);
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
