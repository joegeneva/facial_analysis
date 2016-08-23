# face_emotions
Joseph Geneva

Detect emotions through facial recognition, work in progess

This project explores a method of detecting basic emotions based on facial expressions. This was done using a client server architecture, where a client, such as a laptop, talks to a server in the cloud. A webcam captures the image, and the computer sends the data to the server, which sends back the emotion it identified. This achieved some limited success, able to react to data but unable to reliably classify emotions. It does provide a foundation for improving the results in the future. With more training data, test data, and automated testing, the process could be run much faster to find results. \

This project is based on node.js and generated with express. It makes use of the following:

https://github.com/auduno/clmtrackr
https://github.com/cazala/synaptic/
https://github.com/expressjs/express
https://github.com/harthur/brain
https://github.com/nodejs/node