export const createDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_URL}/api/donations`, donationData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
}; 