const functions = require("firebase-functions");

const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testreact-b0482-default-rtdb.firebaseio.com"
});

const express = require("express");
const cors = require("cors");
const { response } = require("express");
const app = express();

app.use(cors({ origin: true }));
const db = admin.firestore();
// Routes
app.get("/", (req, res) => {
  return res.status(200).send("Hai there");
});
// create
// Post
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      debugger;
      await db.collection("userdetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });

      return res.status(200).send({ status: "Success", msg: "Data Saved" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});
// create Buyer
// Post
app.post("/api/buyerSet", (req, res) => {
  (async () => {
    try {

      await db.collection("buyerdetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        buyerName: req.body.buyerName,
        flatMeasurement: req.body.flatMeasurement,
        pricePersqft: req.body.pricePersqft,
        totalPrice: req.body.totalPrice,
        loggedinUserName: req.body.loggedinUserName,
        loggedinuserEmail: req.body.loggedinuserEmail
      });

      return res.status(200).send({ status: "Success", msg: "Data Saved" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});


app.post("/api/paymentSet", (req, res) => {
  (async () => {
    try {

      await db.collection("paymentdetails").doc(`/${Date.now()}/`).create({
        id: Date.now(),
        buyerId: req.body.buyerId,
        buyer: req.body.buyer,
        payment: req.body.payment,
        paymentDate: req.body.paymentDate,
        loggedinUserName: req.body.loggedinUserName,
        loggedinuserEmail: req.body.loggedinuserEmail
      });

      return res.status(200).send({ status: "Success", msg: "Data Saved" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

app.put("/api/updateBuyerInfo/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("buyerdetails").doc(req.params.id);
      await reqDoc.update({
        buyerName: req.body.buyerName,
        flatMeasurement: req.body.flatMeasurement,
        pricePersqft: req.body.pricePersqft,
        totalPrice: req.body.totalPrice,
      });
      return res.status(200).send({ status: "Success", msg: "Data Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

app.put("/api/updatePaymentInfo/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("paymentdetails").doc(req.params.id);
      await reqDoc.update({
        buyer: req.body.buyer,
        payment: req.body.payment,
        paymentDate: req.body.paymentDate
      });
      return res.status(200).send({ status: "Success", msg: "Data Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});



// get buyer Details
app.get("/api/getBuyersDetails", (req, res) => {
  (async () => {
    try {
      let query = db.collection("buyerdetails");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            buyerName: doc.data().buyerName,
            flatMeasurement: doc.data().flatMeasurement,
            pricePersqft: doc.data().pricePersqft,
            totalPrice: doc.data().totalPrice,
            createdBy: doc.data().loggedinUserName,
            createrEmail: doc.data().loggedinuserEmail,
            id: doc.data().id,

          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});


// get buyer Details
app.get("/api/getPaymentDetails", (req, res) => {
  (async () => {
    try {
      let query = db.collection("paymentdetails");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            buyerId: doc.data().buyerId,
            buyer: doc.data().buyer,
            payment: doc.data().payment,
            paymentDate: doc.data().paymentDate,
            createdBy: doc.data().loggedinUserName,
            createrEmail: doc.data().loggedinuserEmail,
            paymentId: doc.data().id,
            id: doc.data().id
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// read specific user detail
// get
app.get("/api/userDetail/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      let userDetail = await reqDoc.get();
      let response = userDetail.data();

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// read all user details
// get
app.get("/api/userDetails", (req, res) => {
  (async () => {
    try {
      let query = db.collection("userdetails");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            name: doc.data().name,
            mobile: doc.data().mobile,
            address: doc.data().address,
            id: doc.data().id,
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});
//get user details
app.get("/api/validateUser", (req, res) => {
  (async () => {
    try {
      let query = db.collection("users");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            Email: doc.data().Email,
            Password: doc.data().Password,
            Name: doc.data().Name,
            IsSso: doc.data().IsSso,
            Id: doc.data().Id,

          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});



// update
// put
app.put("/api/update/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("userdetails").doc(req.params.id);
      await reqDoc.update({
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
      });
      return res.status(200).send({ status: "Success", msg: "Data Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});




// delete
// delete
app.delete("/api/paymentDelete/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("paymentdetails").doc(req.params.id);
      await reqDoc.delete();
      return res.status(200).send({ status: "Success", msg: "Payment data Removed" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});


// delete
app.delete("/api/deleteBuyer/:id", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("buyerdetails").doc(req.params.id);
      await reqDoc.delete();
      return res.status(200).send({ status: "Success", msg: "Data Removed" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});



// Exports api to the firebase cloud functions
exports.app = functions.https.onRequest(app);