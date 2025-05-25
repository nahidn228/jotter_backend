const {
  noteCollection,
  imageCollection,
  pdfCollection,
  folderCollection,
} = require("../utils/connectDB");

const getAllDataByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required in query" });
    }

    const selectedDate = new Date(date);
    const nextDate = new Date(date);
    nextDate.setDate(selectedDate.getDate() + 1); // for range comparison

    const query = {
      createdAt: {
        $gte: selectedDate,
        $lt: nextDate,
      },
    };

    const notes = await noteCollection.find(query).toArray();
    const images = await imageCollection.find(query).toArray();
    const pdfs = await pdfCollection.find(query).toArray();
    const folders = await folderCollection.find(query).toArray();

    res.status(200).json({
      message: "Fetched data for selected date",
      date: selectedDate.toDateString(),
      notes,
      images,
      pdfs,
      folders,
    });
  } catch (error) {
    console.error("Date filter error:", error);
    res
      .status(500)
      .json({ message: "Error fetching data by date", error: error.message });
  }
};

module.exports = { getAllDataByDate };
