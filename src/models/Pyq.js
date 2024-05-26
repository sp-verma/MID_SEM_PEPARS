const { model, Schema, default: mongoose, models } = require("mongoose");

const PyqSchema = Schema(
  {
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
    },
    url: {
      type: String,
      required: [true, "please upload pdf"],
    },
    year: {
      type: Number,
    },
    // endsem: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

// Pyq.find({}).populate({
//   path:'subject',
//   model:Subject
// })

// [
//   {
//     _id: 1231231,
//     subject: {
//       subject:{
//         _id:'6evn324asdasd'
//         name:'Math',
//         branch:'Cse',
//         sem:3
//       }
//     },
//     url: "httpsS://asdasd.co",
//     year: 2021,
//   },
// ];

const Pyq = models?.pyq || model("pyq", PyqSchema);
export default Pyq;
