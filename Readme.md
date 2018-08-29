Hexo Deployer GCS
---
Plugin for hexo to make it easy to deploy to GCS for static file hosting.



**Configuration**

Below shows the main things to put in the `deploy` section of your `_config.yaml` file.  The key file is optional, alternatively you can set the enviornment variable `GOOGLE_APPLICATION_CREDENTIALS`.  For more information see https://cloud.google.com/docs/authentication/

```yaml

deploy:
  type: gcs
  bucket: <bucket_name>
  projectId: <gcs_project_id>
  keyFilename: <optional_key_file_path>

```



**License**
Apache 2.0

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
