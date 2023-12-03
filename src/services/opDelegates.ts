import Axios from "axios";

interface CustomResponse {
  success: boolean;
  message: string;
  data?: any;
}

const axios = Axios.create({
  headers: {
    "Content-Type": "application/json",
    // 'X-Api-Key': process.env.REACT_APP_X_API_KEY ?? '',
  },
});

// @Greg the delegates API endpoint is at `${process.env.BASE_URL}/get_daily_delegates/api?delegate=${address}`
export const getOPDelegated = async (
  address: string
): Promise<CustomResponse> => {
  try {
    // percentage encoded address
    address = encodeURIComponent(address);
    const { data: responseData } = await axios.get<[]>(
      `${process.env.BASE_URL}/get_daily_data/api?delegate=${address}`
    );

    if (responseData?.length > 0)
      return {
        success: true,
        message: "Data Retrieved",
        data: responseData,
      };
    else throw new Error("No data retrieved");
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
