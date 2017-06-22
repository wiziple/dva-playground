import React from 'react';
import { Modal, Form, Icon, Input, Button, Alert, Checkbox } from 'antd';

import styles from './SigninModal.less';

const FormItem = Form.Item;


const SignInModal = Form.create()(
  (props) => {
    const { visibleSignin, handleCancelSigninModal, handleSubmitSigninModal, form, error } = props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visibleSignin}
        width={392}
        footer={null}
        onCancel={handleCancelSigninModal}
      >
        <Form className={styles.signinForm} onSubmit={handleSubmitSigninModal}>
          { error && <Alert className={styles.error} message={error} type="error" showIcon /> }
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
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
            <Button type="primary" htmlType="submit" className={styles.signinButton}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </Modal>
    );
  },
);

export default SignInModal;

