// ./src/azure-storage-blob.ts

// <snippet_package>
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient } from "@azure/storage-blob";

const containerName = `blobrepo`;
const sasToken =
  "sp=racwdl&st=2023-03-31T21:02:58Z&se=2029-04-01T05:02:58Z&spr=https&sv=2021-12-02&sr=c&sig=LAvmzKaFM7YhiIfRfKgPdhX7MybZSNcDCnf%2FQ%2Bzq2qQ%3D";
const storageAccountName = "qomrahdms";
// </snippet_package>

// <snippet_get_client>
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(uploadUrl);

// get Container - full public read access
const containerClient = blobService.getContainerClient(containerName);
// </snippet_get_client>

// <snippet_isStorageConfigured>
// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};
// </snippet_isStorageConfigured>

// <snippet_getBlobsInContainer>
// return list of blobs in container to display
export const getBlobsInContainer = async () => {
  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {

    const blobItem = {
      url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${sasToken}`,
      name: blob.name,
    };

    // if image is public, just construct URL
    returnedBlobUrls.push(blobItem);
  }

  return returnedBlobUrls;
};

export const getFile = (file: string) => {
  return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file}?${sasToken}`;
};

export const deleteFile = async (blobId: string) => {
  const blobClient = containerClient.getBlockBlobClient(blobId);
  // upload file
  await blobClient.deleteIfExists()
};

// </snippet_getBlobsInContainer>

// <snippet_createBlobInContainer>
const createBlobInContainer = async (file: File, blobId: string) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(blobId);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file: File, blobId: string) => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file, blobId);
};
// </snippet_uploadFileToBlob>

export default uploadFileToBlob;
