
[![Build and publish](https://github.com/zarya/pyhss-gui/actions/workflows/build-docker-actions.yaml/badge.svg)](https://github.com/zarya/pyhss-gui/actions/workflows/build-docker-actions.yaml)

# Docker
`docker run -p 8999:80 ghcr.io/zarya/pyhss-gui:master`   < not the version in this repo 

After the container is started you can access the webinterface on port 8999 (http://localhost:8999)

# Development

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
The page will reload if you make edits.<br />
You will also see any lint errors in the console.
bind to localhost only

### `npm run devpub`
same as `npm run dev` but bind to 0.0.0.0


### `npm run justbuild`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!


## Tnx to
* https://github.com/erdkse/adminlte-3-react (Providing the base and template)



## Bug Fixes & Updates:

ICCID Field: Enforced minimum length of 18 and maximum length of 20 characters.

IMSI Field: Enforced fixed length of 15 digits.

AMF Field: Corrected label to Authentication Management Field (thanks to @jmasterfunk).

Diameter Peers: Resolved issue with incorrect peer count; related API changes implemented.

Subscriber Wizard: Fixed issue where SQN (Sequence Number) was left NULL.

EIR Support: Added initial support for Equipment Identity Register.

OAM Deregistration on Disable: When a subscriber is changed to disabled and Save is clicked, the OAM Deregister API is triggered for that IMSI — effectively removing the device from the network.

Resolved issue where clicking "Add" after editing a record would reopen the last edited entry instead of a blank form.
  - Affected modules: **Subscribers**, **IMS Subscribers**, **TFT**, **Charging Rules**, **Roaming: Networks**, **Roaming: Rules**
