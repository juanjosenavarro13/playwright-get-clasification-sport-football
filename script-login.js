const loginIberiaCom = async (userID, password, env) => {
  const url =
    env === "uatb" || env === "pree" ? "https://uatb-ibisservices.iberia.com" : "https://uatd-ibisservices.iberia.com";
  const authorizationToken =
    env === "uatb" || env === "pree"
      ? "aWJlcmlhX3dlYjphOWQ4NjRiZi1jY2Y2LTQwODctYTJmMS1hMzI1YWEyNGIxMWE="
      : "aWJlcmlhX3dlYjphOWQ4NjRiZi1jY2Y2LTQwODctYTJmMS1hMzI1YWEyNGIxMWE=";
  try {
    const anomResp = await fetch(url + "/api/auth/realms/commercial_platform/protocol/openid-connect/token", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Authorization: `Basic ${authorizationToken}`,
      },
      body: "grant_type=client_credentials",
    });
    const { access_token: anonymousToken } = await anomResp.json();

    const resp = await fetch(`${url}/api/lgm-ul/rs/v1/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anonymousToken}`,
      },
      body: JSON.stringify({
        login: userID,
        password: password,
      }),
    });
    const respJson = await resp.json();
    document.cookie = "IBERIACOM_SSO_REFRESH=" + respJson.ibisToken.refreshToken;
    document.cookie = "IBERIACOM_SSO_ACCESS_TO=" + respJson.ibisToken.accessTokenExpiration;
    document.cookie = "IBERIACOM_SSO_REFRESH_TO=" + +respJson.ibisToken.refreshTokenExpiration;
    document.cookie = "IBERIACOM_SSO_ACCESS=" + respJson.ibisToken.accessToken;
    document.cookie = "IBERIACOM_SSO_ACCESS_SALESFORCE=" + respJson.salesforceToken.accessToken;
    document.cookie = "IBERIACOM_SSO_REFRESH_SALESFORCE=" + respJson.salesforceToken.accessToken; //cookie SF refresco falta
    document.cookie = "IBERIACOM_SSO_ACCESS_TO_SALESFORCE=" + respJson.salesforceToken.accessTokenExpiration;
  } catch (err) {
    console.error(err);
    console.log("Login failed");
  }
};

const user1 = ["7600877", "Iberia1234"]; // ininita prime
const user2 = ["7600901", "Iberia21!"]; // infinita
const user3 = ["7717283", "Iberia24!"]; // platino
const user4 = ["4839387", "Iberia22."]; // clasica
const user5 = ["4838330", "Iberia1234"]; // oro
const user6 = ["4838991", "Iberia1234"]; // vueling
const user7 = ["4823266", "Iberia1234"]; // vueling
const user8 = ["prueba@lyt.es", "Iberia22.."]; // zero

const user = user3;

loginIberiaCom(user[0], user[1], "uatb"); // user, passsword, env (uatb, uatd) as params
