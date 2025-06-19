import { Button, Flex, Input, Space, Image, Form } from 'antd';
import axios from 'axios';
import { useState } from 'react';

export const App = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const generateImage = async () => {
    try {
      setIsGenerating(true);
      setImage(null);
      const { data } = await axios.post(`https://comfyui-beckend.vercel.app/`, {
        input,
      });
      setIsGenerating(false);
      setImage(data.output[0].url);
    } catch (err) {
      setIsGenerating(false);
      console.error('Error generating image:', err);
    }
  };

  return (
    <>
      <h1>Elvin Valentino - ComfyUI Test</h1>
      <Flex vertical>
        <Space direction="vertical">
          <Form onFinish={generateImage}>
            <Input
              onChange={e => setInput(e.target.value)}
              value={input}
              size="large"
              placeholder="Type to generate an image"
              style={{ marginBottom: '8px' }}
            />
            <Button
              type="primary"
              block
              size="large"
              htmlType="submit"
              onClick={generateImage}
              loading={isGenerating}
            >
              {isGenerating ? 'Generating image...' : 'Generate image'}
            </Button>
          </Form>

          {image && (
            <Flex justify="center">
              <Image src={image} />
            </Flex>
          )}
        </Space>
      </Flex>
    </>
  );
};

export default App;
