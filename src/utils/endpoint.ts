// a file that checks the `PUBLIC_ENV` env variable, if its dev returns a specific base url, if its prod it returns another base url.

export const getBaseUrl = () => {
  if (process.env.PUBLIC_ENV === "dev") {
    return "https://y2zegsb3b7.execute-api.us-east-1.amazonaws.com/Prod";
  } else {
    return "https://arxx451fw8.execute-api.us-east-2.amazonaws.com/Prod";
  }
};
