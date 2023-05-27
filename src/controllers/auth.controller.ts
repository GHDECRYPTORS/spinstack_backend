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
