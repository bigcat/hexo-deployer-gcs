/*
Copyright 2018 Ben Catlin

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

const Storage = require('@google-cloud/storage');
const recursive = require('recursive-readdir');

console.log('Loading gcs deployer plugin');

module.exports = function (args) {

    const verbose = !args.silent;
    const projectId = args.projectId || procs.env.GOOGLE_CLOUD_PROJECT;
    const bucketName = args.bucket;
    let storageOptions = {
        projectId
    };

    if (typeof(args.keyFilename) !== 'undefined' ) {
        storageOptions.keyFilename = args.keyFilename;
    }

    const storage = new Storage(storageOptions);

    if (!projectId || !bucketName) {
        let help = `
        You should configure youre deployment settings in _config.yml first.
        Example:
            deploy:
                type: gcs
                bucket: <bucketName>
                projectId: <projectId> -- can leave this blank if running in cloud shell (I think)
                keyFilename: <optional_key_file_path>
        `;
        console.log(help);
    }


    return new Promise( async (resolve, reject) => {

        const publicDir = this.config.public_dir;

        const files = await recursive(publicDir);

        //console.log('Ready to upload files: \n' + files)

        files.forEach( async (filename) => {
            const shortPath = filename.substring(publicDir.length + 1);
            try {
                await storage

                // Uploads a local file to the bucket
                .bucket(bucketName)
                .upload(filename, {
                    destination: shortPath,
                    // Support for HTTP requests made with `Accept-Encoding: gzip`
                    gzip: true,
                    metadata: {
                        // Enable long-lived HTTP caching headers
                        // Use only if the contents of the file will never change
                        // (If the contents will change, use cacheControl: 'no-cache')
                        cacheControl: 'public, max-age=31536000',
                    }
                });
                verbose && console.log(`${filename} uploaded to ${bucketName}/${shortPath}.`);
            }
            catch (err) {
                console.error(`new error! ${err} on file: ${filename}`)
                reject(err);
            }
        });

        resolve(true);
    });
}
