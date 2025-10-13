// components/TutorProfileForm.jsx
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const TutorProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Implement your logic to submit the form data to your backend
      console.log('Submitting tutor profile:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset form on success
      setFormData({ name: '', subject: '', bio: '' });
      alert('Tutor profile created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to create tutor profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create Your Tutor Profile
        </CardTitle>
        <CardDescription className="text-center">
          Share your expertise and help students find the perfect mentor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject/Expertise *
            </Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g., Mathematics, Computer Science, Physics"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Biography *
            </Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell students about your teaching experience, qualifications, and what makes you a great tutor..."
              required
              className="w-full min-h-[120px] resize-none"
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Profile...' : 'Create Tutor Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TutorProfileForm;
