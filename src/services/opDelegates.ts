import Axios from 'axios';

interface CustomResponse {
  success: boolean;
  message: string;
  data?: any;
}

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 'X-Api-Key': process.env.REACT_APP_X_API_KEY ?? '',
  },
});

export const getOPDelegated = async (
  address: string,
): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.get<[]>(
      `${process.env.REACT_APP_API_URL}/daily_data_api_opdelegates?delegate=${address}`,
    );

    if (responseData?.length > 0)
      return {
        success: true,
        message: 'Data Retrieved',
        data: responseData,
      };
    else throw new Error('No data retrieved');
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
