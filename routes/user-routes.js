const router = require("express").Router();
const User = require("../model/user-model");

router.post("/", async (req, res) => {
  try {
    const savedUser = await User.create(req.body);

    res.status(200).json({
      data: savedUser,
      message: "Record Saved",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  const query = {};
  if ("title" in req.query) query.title = req.query.title;
  if ("description" in req.query) query.description = req.query.description;
  if ("status" in req.query) query.status = req.query.status;
  let projections = { sort: "title" };
  await User.find(query, null, projections)
    .then((doc) => {
      if (doc.length == 0) {
        return res.status(404).json({ message: "No records found" });
      }
      res.status(200).json({ data: doc });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});
router.put("/:id", async (req, res) => {
  try {
    const resp = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      data: resp,
      message: "Record Saved",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resp = await User.findByIdAndDelete(req?.params?.id);
    res.status(200).json({
      resp: resp,
      message: "Record Deleted"
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
module.exports = router;
