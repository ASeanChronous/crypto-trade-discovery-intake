// pages/api/applications.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const applicationData = req.body;
      
      // Here you would save to a real database
      // For now, we'll just log and return success
      console.log('Application received:', applicationData);
      
      res.status(200).json({ 
        success: true, 
        id: applicationData.id,
        message: 'Application saved successfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save application' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
