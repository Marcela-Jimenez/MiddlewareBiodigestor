const serialPort = require("serialport");
const axios = require("axios");

const port = new serialPort("COM7", { baudRate: 9600 });
const parser = new serialPort.parsers.Readline();
port.pipe(parser);

parser.on("data", (data) => {
  data = data.replace(/\r/g, "");
  const lecturas = data.split(";");

  const url = "http://localhost:5240/api/DatosBiodigestor";
  const body = {
    lecturas: [
      {
        dtBMuestra: lecturas[0],
        dtBTmpInterna: lecturas[1],
        dtBTmpExterna: lecturas[2],
        dtBHmdRelativa: lecturas[3],
        dtBVoltaje: lecturas[4],
        dtBPresion: lecturas[5],
        dtBLight: lecturas[6],
        dtBPh: lecturas[7],
      },
    ],
  };

  axios
    .post(url, body)
    .then((response) => {
      console.log("Respuesta de la solicitud POST:", response.data);
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud POST:", error);
    });
});
