import ethUtil from "ethereumjs-util";

export default class UserService {
  public generateNonce(publicAddress: string) {
    return Math.floor(Math.random() * 1000000)
  }
}