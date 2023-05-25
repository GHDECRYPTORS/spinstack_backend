import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import { User, UserDocument } from "../models/user.model";

const bcrypt = require("bcrypt");
const ethers = require("ethers");
const CryptoJS = require("crypto-js");
import { EthereumPrivateKeySignatureProvider } from "@requestnetwork/epk-signature";
import * as RequestNetwork from "@requestnetwork/request-client.js";

export const register = async function (req: Request, res: Response) {
  const privateKey = ethers.Wallet.createRandom().privateKey;
  const encryptedPk = CryptoJS.AES.encrypt(
    privateKey,
    process.env.ENCRYPTION_KEY
  );

  let user: unknown = await User.create({
    ...req.body,
    encrypted_pk: encryptedPk.toString(),
    hash_password: bcrypt.hashSync(req.body.password, 10),
  });

  let _user = user as UserDocument;
  return res.json(_user.login("Signed up successfully"));
};

export const login = async function (req: Request, res: Response) {
  let user = (await User.findOne({
    email: req.body.email,
  })) as UserDocument;
  if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({
      message: "Authentication failed. Invalid user or password.",
    });
  }
  return res.json(user.login("Logged in successfully"));
};
export const profile = async function (req: Request, res: Response) {
  return res.status(200).json({
    message: "Profile fetched successfully!!",
    user: req.user,
  });
};

export const createOrder = async function (req: Request, res: Response) {
  const payeeIdentity = {
    type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: "0x627306090abab3a6e1400e9345bc60c78a8bef57",
  };
  const payerIdentity = {
    type: RequestNetwork.Types.Identity.TYPE.ETHEREUM_ADDRESS,
    value: "0xF317BedAA5c389F2C6f469FcF25e0752C7228Ba6",
  };

  const payeeSignatureInfo = {
    method: RequestNetwork.Types.Signature.METHOD.ECDSA,
    privateKey:
      "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
  };

  const signatureProvider = new EthereumPrivateKeySignatureProvider(
    payeeSignatureInfo
  );

  const requestNetwork = new RequestNetwork.RequestNetwork({
    signatureProvider,
    useMockStorage: true,
  });
  // const requestInfo: RequestNetwork.Types.IRequestInfo = {
  //   currency: "REQ",
  //   expectedAmount: "1000000000000000000", // 1 REQ
  //   payee: payeeIdentity,
  //   payer: payerIdentity,
  // };

  return res.json({ "": "" });
};
