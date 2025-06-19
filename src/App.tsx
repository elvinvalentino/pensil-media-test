import { Button, Flex, Input, Space, Image } from 'antd';
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
      <h1>ComfyUI Test</h1>
      <Flex vertical>
        <Space direction="vertical">
          <Input
            onChange={e => setInput(e.target.value)}
            value={input}
            size="large"
            placeholder="Type to generate an image"
          />
          <Button
            type="primary"
            block
            size="large"
            onClick={generateImage}
            loading={isGenerating}
          >
            {isGenerating ? 'Generating image...' : 'Generate image'}
          </Button>

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
