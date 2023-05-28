import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import { User, UserDocument } from "../models/user.model";

const bcrypt = require("bcrypt");
const ethers = require("ethers");
const CryptoJS = require("crypto-js");
import { EthereumPrivateKeySignatureProvider } from "@requestnetwork/epk-signature";
import * as RequestNetwork from "@requestnetwork/request-client.js";
import { BusinessDocument } from "../models/business.model";
import { Order } from "../models/order.model";
import { request } from "http";

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
      currency: {
        type: RequestNetwork.Types.RequestLogic.CURRENCY.ETH,
        value: "ETH",
        network: "goerli",
      },

      expectedAmount: req.body.amount_in_wei,
      payee: payeeIdentity,
    };

    const addressBasedPaymentNetwork: RequestNetwork.Types.Payment.IPaymentNetworkCreateParameters =
      {
        id: RequestNetwork.Types.Extension.PAYMENT_NETWORK_ID.NATIVE_TOKEN,
        parameters: {},
      };
    const addressBasedCreateParams = {
      addressBasedPaymentNetwork,
      requestInfo,
      signer: payeeIdentity,
    };
    const request = await requestNetwork.createRequest(
      addressBasedCreateParams
    );

    const data = request.getData();

    const orderData = {
      ...req.body,
      request_id: data.requestId,
      business_id: req.business._id,
      status: data.state,
      amount_in_wei: data.expectedAmount,
      currency: req.body.currency,
      meta: data.meta,
      url: `${process.env.REQUEST_URL}/${data.requestId}`,
    };

    await new Order(orderData).save();
    res.json(orderData);
  } catch (err) {
    return res.json({ error: `${err}`, status: false });
  }
};

export const retrieveOrder = async function (req: Request, res: Response) {
  try {
    if (req.business == null) {
      return res.json({
        error: "no authorization",
        status: false,
      });
    }

    let userOrders = await Order.findOne({
      request_id: req.params.orderId,
      business_id: req.business._id,
    });

    if (userOrders == null) {
      userOrders = await Order.findOne({
        _id: req.params.orderId,
        business_id: req.business._id,
      });
    }

    return res.json(userOrders);
  } catch (err) {
    return res.json({ error: `${err}`, status: false });
  }
};
export const retrieveAllOrders = async function (req: Request, res: Response) {
  try {
    if (req.business == null) {
      return res.json({
        error: "no authorization",
        status: false,
      });
    }

    const userOrders = await Order.find({
      business_id: req.business._id,
    }).select("title amount_in_wei currency id status request_id");

    return res.json(userOrders);
  } catch (err) {
    return res.json({ error: `${err}`, status: false });
  }
};

export const updateOrder = async function (req: Request, res: Response) {
  try {
    if (req.business == null) {
      return res.json({
        error: "no authorization",
        status: false,
      });
    }

    const userOrders = await Order.findOne({
      request_id: req.params.orderId,
      business_id: req.business._id,
    });

    const privateKey = await decryptPk(req.business.encrypted_pk);

    const requestNetwork = requestNetworkFromPK(privateKey);
    const request = await requestNetwork.fromRequestId(req.params.orderId);
    const data = request.getData();

    const orderData = {
      request_id: data.requestId,
      business_id: req.business._id,
      status: data.state,
      amount_in_wei: data.expectedAmount,
      currency: req.body.currency,
      meta: data.meta,
      url: `${process.env.REQUEST_URL}/${data.requestId}`,
    };

    await userOrders?.updateOne(orderData);

    return res.json(orderData);
  } catch (err) {
    return res.json({ error: `${err}`, status: false });
  }
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
