// Date: 2021/09/12
async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url); 
    console.log('response:', response);
    return response.ok;
  } catch (error) {
    console.error('Error checking image existence:', error);
    return false;
  }
} 
export default isValidImageUrl;
