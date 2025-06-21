const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/donations/donate', {
      donorName: formData.donorName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      message: formData.message,
      donationType: formData.donationType,
      amount: formData.amount,
      paymentMethod: formData.paymentMethod
    });

    if (response.data) {
      setSuccessMessage('Thank you for your donation!');
      setFormData({
        donorName: '',
        email: '',
        phone: '',
        city: '',
        message: '',
        donationType: 'one-time',
        amount: '',
        paymentMethod: 'credit-card'
      });
      setTimeout(() => {
        navigate('/donation-history');
      }, 2000);
    }
  } catch (error) {
    console.error('Donation submission error:', error);
    setErrorMessage(error.response?.data?.message || 'Error submitting donation');
  }
};

<button 
  type="submit" 
  className="btn btn-primary"
  onClick={(e) => handleSubmit(e)}
>
  Complete Donation
</button> 