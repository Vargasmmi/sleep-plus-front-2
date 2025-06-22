import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLogin } from "@refinedev/core";
import { Form, Input, Button, Card, Typography, Space, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
export const Login = () => {
    const { mutate: login, isLoading } = useLogin();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        login(values);
    };
    const fillCredentials = (email, password) => {
        form.setFieldsValue({ email, password });
    };
    return (_jsx("div", { style: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f2f5",
        }, children: _jsx(Card, { style: {
                width: 400,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }, children: _jsxs(Space, { direction: "vertical", size: "large", style: { width: "100%", textAlign: "center" }, children: [_jsxs("div", { children: [_jsx(Title, { level: 2, style: { marginBottom: 8 }, children: "Sleep+ Admin" }), _jsx(Text, { type: "secondary", children: "LA Mattress Store Administration System" })] }), _jsx(Alert, { message: "Demo Credentials", description: _jsxs(Space, { direction: "vertical", size: "small", style: { width: "100%" }, children: [_jsxs("div", { style: { textAlign: "left" }, children: [_jsx(Text, { strong: true, children: "Demo User (Agent):" }), _jsx("br", {}), _jsxs(Button, { type: "link", size: "small", onClick: () => fillCredentials("demo@lamattressstore.com", "demo123"), style: { padding: 0 }, children: [_jsx(Text, { code: true, children: "demo@lamattressstore.com" }), " / ", _jsx(Text, { code: true, children: "demo123" })] })] }), _jsxs("div", { style: { textAlign: "left" }, children: [_jsx(Text, { strong: true, children: "Manager:" }), _jsx("br", {}), _jsxs(Button, { type: "link", size: "small", onClick: () => fillCredentials("john.smith@lamattressstore.com", "demo123"), style: { padding: 0 }, children: [_jsx(Text, { code: true, children: "john.smith@lamattressstore.com" }), " / ", _jsx(Text, { code: true, children: "demo123" })] })] }), _jsxs("div", { style: { textAlign: "left" }, children: [_jsx(Text, { strong: true, children: "Administrator:" }), _jsx("br", {}), _jsxs(Button, { type: "link", size: "small", onClick: () => fillCredentials("admin@lamattressstore.com", "admin123"), style: { padding: 0 }, children: [_jsx(Text, { code: true, children: "admin@lamattressstore.com" }), " / ", _jsx(Text, { code: true, children: "admin123" })] })] })] }), type: "info", showIcon: true }), _jsxs(Form, { form: form, name: "login", onFinish: onFinish, layout: "vertical", requiredMark: false, children: [_jsx(Form.Item, { name: "email", label: "Email", rules: [
                                    {
                                        required: true,
                                        message: "Please enter your email",
                                    },
                                    {
                                        type: "email",
                                        message: "Invalid email",
                                    },
                                ], children: _jsx(Input, { size: "large", prefix: _jsx(UserOutlined, {}), placeholder: "your@email.com" }) }), _jsx(Form.Item, { name: "password", label: "Password", rules: [
                                    {
                                        required: true,
                                        message: "Please enter your password",
                                    },
                                ], children: _jsx(Input.Password, { size: "large", prefix: _jsx(LockOutlined, {}), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }) }), _jsxs(Form.Item, { children: [_jsx(Form.Item, { name: "remember", valuePropName: "checked", noStyle: true, children: _jsx(Checkbox, { children: "Remember me" }) }), _jsx("a", { style: { float: "right" }, href: "#", children: "Forgot password?" })] }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", size: "large", loading: isLoading, block: true, children: "Sign In" }) })] })] }) }) }));
};
