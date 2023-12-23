import Axios from 'axios';

interface CustomResponse {
  success: boolean;
  message: string;
  data?: any;
}

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 'X-Api-Key': import.meta.env.REACT_APP_X_API_KEY ?? '',
  },
});

export const getOPDelegated = async (
  address: string,
): Promise<CustomResponse> => {
  try {
    // percentage encoded address
    address = encodeURIComponent(address);
    const { data: responseData } = await axios.get<[]>(
      `${import.meta.env.VITE_API_URL}/get_daily_data/api?delegate=${address}`,
    );

    if (typeof responseData !== 'string' && responseData?.length > 0)
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

export const getNumDelegators = async (
  address: string,
): Promise<CustomResponse> => {
  try {
    // percentage encoded address
    address = encodeURIComponent(address);
    const { data: responseData } = await axios.get<[]>(
      `${
        import.meta.env.VITE_API_URL
      }/get_daily_delegates/api?delegate=${address}`,
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

export const getOPDelegatedDailyDifference = async (
  address: string,
): Promise<CustomResponse> => {
  try {
    // percentage encoded address
    address = encodeURIComponent(address);
    const { data: responseData } = await axios.get<[]>(
      `${
        import.meta.env.VITE_API_URL
      }/get_daily_data_changes/api?delegate=${address}`,
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

export const getNumDelegatorsDailyDifference = async (
  address: string,
): Promise<CustomResponse> => {
  try {
    // percentage encoded address
    address = encodeURIComponent(address);
    const { data: responseData } = await axios.get<[]>(
      `${
        import.meta.env.VITE_API_URL
      }/get_daily_delegates_changes/api?delegate=${address}`,
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

export const geTopDelegators = async (
  address: string,
): Promise<CustomResponse> => {
  try {
    // percentage encoded address
    address = encodeURIComponent(address);
    const { data: responseData } = await axios.get<[]>(
      `${
        import.meta.env.VITE_API_URL
      }/get_top_delegators/api?delegate=${address}`,
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

export const getTopDelegates = async (): Promise<CustomResponse> => {
  try {
    const { data: responseData } = await axios.get<[]>(
      `${import.meta.env.VITE_API_URL}/get_top_delegates`,
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
}