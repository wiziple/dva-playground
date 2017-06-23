import React from 'react';
import { Modal, Form, Icon, Input, Button, Alert, Checkbox } from 'antd';

import styles from './SignInModal.less';

const FormItem = Form.Item;


const SignInModal = Form.create()(
  (props) => {
    const { visible, handleCancel, handleRegister, handleSubmit, form, error } = props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title="Sign In"
        visible={visible}
        width={392}
        footer={null}
        onCancel={handleCancel}
      >
        <Form className={styles.form} onSubmit={handleSubmit}>
          { error && <Alert className={styles.error} message={error} type="error" showIcon /> }
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Please enter valid email.',
              }, {
                required: true, message: 'Please enter your email.',
              }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />,
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please enter your Password.' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>,
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Log in
            </Button>
            Or <a onClick={handleRegister}>register now!</a>
          </FormItem>
        </Form>
      </Modal>
    );
  },
);

export default SignInModal;

