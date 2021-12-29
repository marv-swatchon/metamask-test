import fs from "fs";
import ethUtil from "ethereumjs-util";
import jwt from "jsonwebtoken";

export default class UserService {
  filePath = __dirname + "/users.csv"

  public generateNonce(publicAddress: string) {
    let data = fs.readFileSync(this.filePath, { encoding: "utf8" });
    const rows = data.split("\n");
    let nonce = "";

    for (let index in rows) {
      if (index === "0") {
        continue;
      }

      let row = rows[index].split(",");
      if (row[0] === publicAddress) {
        nonce = row[1];
      }
    }

    if (nonce === "") {
      nonce = Math.floor(Math.random() * 1000000).toString();
      fs.appendFileSync(this.filePath, `${publicAddress},${nonce}\n`, { encoding: "utf8" });
    }

    return nonce;
  }

  public login(publicAddress: string, signature: string) {
    let data = fs.readFileSync(this.filePath, { encoding: "utf8" });
    const rows = data.split("\n");

    let token = "";
    let id = 0;

    for (let index in rows) {
      if (index === "0") {
        continue;
      }

      let row = rows[index].split(",");
      if (row[0] === publicAddress) {
        id = parseInt(index);

        const msg = `${row[1]}`;
        const msgBuffer = ethUtil.toBuffer(msg);
        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        const sigParams = ethUtil.fromRpcSig(signature);
        const publicKey = ethUtil.ecrecover(
          msgHash,
          sigParams.v,
          sigParams.r,
          sigParams.s
        );
        const addressBuffer = ethUtil.publicToAddress(publicKey);
        const address = ethUtil.bufferToHex(addressBuffer);

        if (address.toLowerCase() === publicAddress.toLowerCase()) {
          token = jwt.sign({ userId: id }, "6we90uy61o9");
          fs.writeFileSync(this.filePath, `publicAddress,nonce\n`, { encoding: "utf8" } );
          fs.appendFileSync(this.filePath, `${publicAddress},${Math.floor(Math.random() * 1000000).toString()}\n`, { encoding: "utf8" } );
        }

        return token;
      }
    }
  }
}