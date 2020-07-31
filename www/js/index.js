const TRIAL_LICENSE_KEY =
    "iClmbMB6L8HGiPRKxfLW6qm2aC/S24" +
    "HQOCOZM79i+RI7fFds1ap6IR7wyQRF" +
    "tLdx4tkxPabxnXlXTwkE9WucMR/2zM" +
    "LWt+dqvhkVpZcAw9kCLUppSjkiVDtD" +
    "OeExHDhZ5JyIOqLiUdjkXRHga+i65t" +
    "PNMVoMPgS1chevCxh9gtf/ofH858bN" +
    "kJ4L8tgefjcxHaAHlzyVb73Fh6cY0q" +
    "WoTu84nX+zM3hwThOpxQ3aRilV2Qry" +
    "hsHhy0rR/s03BkGNszMOjfvlhoIP+z" +
    "GOgmEsrLqO9LbYSsCgrAfRgQ45yTN/" +
    "wDiOHqSlGiYPw4/4VkT9nnwpLfKbYT" +
    "yG2mra9M34vA==\nU2NhbmJvdFNESw" +
    "ppby5zY2FuYm90LmV4YW1wbGUuc2Rr" +
    "LmNvcmRvdmEKMTU5ODkxODM5OQo1MT" +
    "IKMg==\n";

const app = {

    camera: null,

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.initUi();
        this.initScanbotSdk();
    },

    initUi: function() {
        document.getElementById('dispose-camera-btn').onclick = () => {
            this.camera.dispose();
        };
    },

    initScanbotSdk: function() {
        const options = {
            loggingEnabled: true,
            licenseKey: TRIAL_LICENSE_KEY
        };
        ScanbotSdk.initializeSdk(result => {
            this.checkCameraPermissionAndStartBarcodeScanner();
        }, this.errorHandler, options);
    },

    checkCameraPermissionAndStartBarcodeScanner: function() {
        ScanbotSdk.requestCameraPermission(result => {
            if (result.status !== 'OK') {
                alert('Camera permission is required to capture video stream');
                return;
            }
            this.startBarcodeScanner();
        }, this.errorHandler);
    },

    startBarcodeScanner: async function() {
        const resultEl = document.getElementById('barcode-result');
        const containerEl = document.getElementById('barcode-scanner-container');
        const barcodeTypes = []; // ['AZTEC', 'DATA_MATRIX'];
        this.camera = await ScanbotHTMLCamera.create(containerEl);

        // define optional finder view
        this.camera.addViewFinder({
            // backgroundColor: "blue",
            width: 300,
            height: 100,
            // border: "5px solid red",
            // borderRadius: 0
        });

        this.camera.startBarcodeDetector(barcodeTypes, async result => {
            resultEl.innerHTML = '';
            if (result.barcodes && result.barcodes.length > 0) {
                // The scan result can contain multiple barcodes,
                // this example just conveniently displays the first one
                const barcode = result.barcodes[0];
                resultEl.innerHTML =
                    'Barcode detected:<br>' +
                    'Type: ' + barcode.type + '<br>' +
                    'Value: ' + barcode.text;
                return;
            }
        });
    },

    errorHandler: function(err) {
        alert('ERROR: ' + JSON.stringify(err));
    },

};

app.initialize();
