import { Business, BusinessDocument } from "../models/business.model";
import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "../types/RequestWithUser";
import mongoose from "mongoose";

const ethers = require("ethers");
const CryptoJS = require("crypto-js");
export const create = async function (req: Request, res: Response) {
  const privateKey = ethers.Wallet.createRandom().privateKey;
  const encryptedPk = CryptoJS.AES.encrypt(
    privateKey,
    process.env.ENCRYPTION_KEY
  );

  let businesses = await Business.find({
    user_id: req.user._id,
  });
  if (businesses.length != 0) {
    return res.json({
      data: null,
      message: "User already have an existing business",
      status: false,
    });
  }

  let business = await Business.create({
    ...req.body,
    user_id: req.user._id,
    encrypted_pk: encryptedPk.toString(),
    // add api key secret and public
  });

  return res.json({
    data: business.toJSON(),
    message: "Business created successfully!!",
  });
};

export const update = async function (req: Request, res: Response) {
  let business = await Business.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    {
      ...req.body,
    }
  );

  if (!business) {
    return res.status(404).json({
      message: "Business not found!!",
    });
  }

  return res.json({
    data: {
      ...business.toJSON(),
      ...req.body,
    },
    message: "Business updated successfully!!",
  });
};

export const deleteOne = async function (req: Request, res: Response) {
  let business = await Business.deleteOne(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    {
      ...req.body,
    }
  );

  if (!business.deletedCount) {
    return res.status(404).json({
      message: "Business not found!!",
    });
  }

  return res.json({
    data: {},
    message: "Business deleted successfully!!",
  });
};

export const getAll = async function (req: Request, res: Response) {
  let businesses = await Business.find({
    user_id: req.user._id,
  }).select("-apps");
  return res.json({
    data: businesses,
    message: "Business fetched successfully!!",
  });
};

export const getOne = async function (req: Request, res: Response) {
  let business = await Business.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!business) {
    return res.status(404).json({
      message: "Business not found!!",
    });
  }

  return res.json({
    data: business.toJSON(),
    message: "Business fetched successfully!!",
  });
};

// export const createApp = async function (req: Request, res: Response) {
//   let newId = new mongoose.Types.ObjectId();
//   let app = await Business.findOneAndUpdate(
//     {
//       _id: req.params.id,
//       user_id: req.user._id,
//     },
//     {
//       $push: {
//         apps: {
//           _id: newId,
//           ...req.body,
//         },
//       },
//     }
//   );

//   if (!app) {
//     return res.status(404).json({
//       message: "Business not found!!",
//     });
//   }

//   return res.json({
//     data: {
//       ...req.body,
//       _id: newId,
//     },
//     message: "App created successfully!!",
//   });
// };

// export const updateApp = async function (req: Request, res: Response) {
//   let app = await Business.findOneAndUpdate(
//     {
//       user_id: req.user._id,
//       "apps._id": req.params.id,
//     },
//     {
//       $set: {
//         "apps.$": {
//           ...req.body,
//         },
//       },
//     }
//   );

//   if (!app) {
//     return res.status(404).json({
//       message: "Business or App not found!!",
//     });
//   }

//   return res.json({
//     data: {
//       ...req.body,
//     },
//     message: "App updated successfully!!",
//   });
// }

// export const deleteApp = async function (req: Request, res: Response) {
//   let app = await Business.findOneAndUpdate(
//     {
//       user_id: req.user._id,
//       "apps._id": req.params.id,
//     },
//     {
//       $pull: {
//         apps: {
//           _id: req.params.id,
//         },
//       },
//     }
//   );

//   if (!app) {
//     return res.status(404).json({
//       message: "Business or App not found!!",
//     });
//   }

//   return res.json({
//     data: {},
//     message: "App deleted successfully!!",
//   });
// }

// export const getApps = async function (req: Request, res: Response) {
//   let businesses = await Business.find({
//     user_id: req.user._id,
//   })

//   return res.json({
//     data: businesses.map((business: any) => business.apps).flat(),
//     message: "Apps fetched successfully!!",
//   });
// }

// export const getApp = async function (req: Request, res: Response) {
//   let business = await Business.findOne({
//     user_id: req.user._id,
//     "apps._id": req.params.id,
//   })

//   if (!business) {
//     return res.status(404).json({
//       message: "Business or App not found!!",
//     });
//   }

//   let app = business.apps.find((app: any) => app._id == req.params.id);

//   return res.json({
//     data: app,
//     message: "App fetched successfully!!",
//   });
// }
