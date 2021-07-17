// const sendNewStudentRequest = async (studentData) => {
//   console.log("Sending request");
//   const response = await fetch("http://localhost:3001/api/v1/students", {
//     method: "POST",
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(studentData)
//   })
//   console.log("response:", response)
//   return response.json()
// }

// const testStudent = {
//   studentId: "7777777",
//   firstName: "first",
//   lastName: "last",
//   email: "email@email.com",
//   gameName: "borengora",
//   preferredEsport: "lol",
// }
//
// sendNewStudentRequest(testStudent)
// .then((data) => {
//   console.log(data)
// })
// .catch((err) => {
//   console.log("err:", err);
// })
