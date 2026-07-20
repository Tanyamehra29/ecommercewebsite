import dns from "dns";

dns.resolveSrv(
  "_mongodb._tcp.cluster0.ha51tyy.mongodb.net",
  (err, addresses) => {
    console.log("Error:", err);
    console.log("Addresses:", addresses);
  }
);