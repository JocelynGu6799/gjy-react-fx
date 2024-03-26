import { Button } from 'antd';
import * as React from 'react';

export interface IAppProps {
}

export default function Appgjy () {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
    </div>
  );
}
