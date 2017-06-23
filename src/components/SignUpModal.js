import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button, Alert, Checkbox } from 'antd';

import styles from './SignUpModal.less';

const FormItem = Form.Item;

class SignUpModal extends Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Password must match.');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { visible, handleCancel, handleSubmit, form, error } = this.props;
    const { getFieldDecorator } = form;
    const inputIconStyle = { fontSize: 13 };

    return (
      <Modal
        title="Sign Up"
        visible={visible}
        width={392}
        footer={null}
        onCancel={handleCancel}
      >
        <Form className={styles.form} onSubmit={handleSubmit}>
          { error && <Alert className={styles.error} message={error} type="error" showIcon /> }
          <FormItem hasFeedback>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Please enter your name.',
              }],
            })(
              <Input prefix={<Icon type="user" style={inputIconStyle} />} placeholder="Full name" />,
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Please enter a valid email.',
              }, {
                required: true, message: 'Please enter your email.',
              }],
            })(
              <Input prefix={<Icon type="mail" style={inputIconStyle} />} placeholder="Email" />,
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please enter your Password.',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input prefix={<Icon type="lock" style={inputIconStyle} />} type="password" placeholder="Password" />,
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('passwordConfirm', {
              rules: [{
                required: true, message: 'Please enter a password confirmation.',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={inputIconStyle} />} type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('agree', {
              valuePropName: 'checked',
              rules: [{
                required: true, message: 'Please agree to the terms of service.',
              }],

            })(
              <Checkbox>I agree to <a href="">Terms</a></Checkbox>,
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className={styles.button}>
              Sign Up
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(SignUpModal);

