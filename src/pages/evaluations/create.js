import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Row, Col, Card, Space, Typography, Upload, Button, Alert, Slider, Radio, Divider, notification, Tag, } from "antd";
import { CameraOutlined, InfoCircleOutlined, } from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const MATTRESS_BRANDS = [
    { value: "tempur-pedic", label: "Tempur-Pedic", score: 95 },
    { value: "sealy", label: "Sealy", score: 85 },
    { value: "serta", label: "Serta", score: 80 },
    { value: "beautyrest", label: "Beautyrest", score: 80 },
    { value: "casper", label: "Casper", score: 75 },
    { value: "purple", label: "Purple", score: 75 },
    { value: "tuft-needle", label: "Tuft & Needle", score: 70 },
    { value: "saatva", label: "Saatva", score: 85 },
    { value: "other", label: "Otra marca", score: 50 },
];
const MATTRESS_SIZES = [
    { value: "twin", label: "Twin", icon: "🛏️" },
    { value: "full", label: "Full", icon: "🛏️" },
    { value: "queen", label: "Queen", icon: "👑" },
    { value: "king", label: "King", icon: "👑" },
    { value: "cal-king", label: "California King", icon: "🌴" },
];
export const EvaluationCreate = () => {
    const { formProps, saveButtonProps, onFinish } = useForm();
    // Debug logging
    console.log('EvaluationCreate rendered:', { formProps, saveButtonProps });
    const [fileList, setFileList] = useState([]);
    const [estimatedCredit, setEstimatedCredit] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [mattressAge, setMattressAge] = useState(3);
    const [mattressCondition, setMattressCondition] = useState("good");
    const { selectProps: customerSelectProps } = useSelect({
        resource: "customers",
        optionLabel: (customer) => `${customer.firstName} ${customer.lastName} - ${customer.phone}`,
        optionValue: "id",
        filters: [
            {
                field: "membershipStatus",
                operator: "eq",
                value: "active",
            },
        ],
    });
    const uploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                notification.error({
                    message: "Error",
                    description: "Solo puedes subir imágenes",
                });
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                notification.error({
                    message: "Error",
                    description: "La imagen debe ser menor a 5MB",
                });
                return false;
            }
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        listType: "picture-card",
    };
    // Calculate estimated credit based on inputs
    React.useEffect(() => {
        if (selectedBrand && mattressCondition) {
            const brand = MATTRESS_BRANDS.find((b) => b.value === selectedBrand);
            const brandScore = brand?.score || 50;
            const conditionScores = {
                excellent: 95,
                good: 80,
                fair: 60,
                poor: 30,
            };
            const conditionScore = conditionScores[mattressCondition] || 50;
            const ageScore = Math.max(20, 100 - (mattressAge - 2) * 10);
            const finalScore = Math.round(conditionScore * 0.4 + brandScore * 0.3 + ageScore * 0.3);
            const baseCredit = 200;
            const credit = Math.min(400, Math.max(25, Math.round(baseCredit * (finalScore / 100))));
            setEstimatedCredit(credit);
        }
    }, [selectedBrand, mattressAge, mattressCondition]);
    const handleSubmit = async (values) => {
        console.log('Form submitted with values:', values);
        if (fileList.length < 3) {
            notification.error({
                message: "Error",
                description: "Debes subir al menos 3 fotos del colchón",
            });
            return;
        }
        try {
            // Simulate AI evaluation
            const aiEvaluation = {
                conditionScore: mattressCondition === "excellent" ? 95 : mattressCondition === "good" ? 80 : mattressCondition === "fair" ? 60 : 30,
                brandScore: MATTRESS_BRANDS.find((b) => b.value === selectedBrand)?.score || 50,
                ageScore: Math.max(20, 100 - (mattressAge - 2) * 10),
                sizeScore: 85,
                finalScore: Math.round(estimatedCredit / 2),
                confidence: Math.min(95, 70 + fileList.length * 5),
            };
            const evaluationData = {
                ...values,
                photos: fileList.map((file) => ({
                    filename: file.name,
                    url: `/uploads/${file.name}`,
                    uploadDate: new Date().toISOString(),
                })),
                aiEvaluation,
                creditApproved: estimatedCredit,
                status: "approved",
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
            };
            console.log('Submitting evaluation data:', evaluationData);
            await onFinish(evaluationData);
        }
        catch (error) {
            console.error('Error submitting evaluation:', error);
            notification.error({
                message: "Error",
                description: "Hubo un error al crear la evaluación. Inténtalo de nuevo.",
            });
        }
    };
    return (_jsx(Create, { saveButtonProps: saveButtonProps, children: _jsxs(Form, { ...formProps, layout: "vertical", onFinish: handleSubmit, children: [_jsxs(Row, { gutter: [16, 16], children: [_jsx(Col, { span: 24, children: _jsxs(Card, { title: "Informaci\u00F3n del Cliente", bordered: false, children: [_jsx(Alert, { message: "Verificaci\u00F3n de Compra Previa", description: "Solo los clientes que hayan comprado un colch\u00F3n hace m\u00E1s de 2 a\u00F1os pueden participar en Trade & Sleep", type: "info", showIcon: true, style: { marginBottom: 16 } }), _jsx(Form.Item, { label: "Cliente", name: "customerId", rules: [{ required: true, message: "Selecciona un cliente" }], children: _jsx(Select, { ...customerSelectProps, placeholder: "Buscar cliente por nombre o tel\u00E9fono...", showSearch: true, filterOption: (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase()) }) })] }) }), _jsx(Col, { xs: 24, lg: 12, children: _jsxs(Card, { title: "Informaci\u00F3n del Colch\u00F3n", bordered: false, children: [_jsx(Form.Item, { label: "Marca del Colch\u00F3n", name: ["mattress", "brand"], rules: [{ required: true, message: "Selecciona la marca" }], children: _jsx(Select, { placeholder: "Seleccionar marca...", onChange: setSelectedBrand, options: MATTRESS_BRANDS.map((brand) => ({
                                                ...brand,
                                                label: (_jsxs(Space, { children: [brand.label, _jsxs(Tag, { color: brand.score >= 80 ? "green" : brand.score >= 60 ? "blue" : "default", children: ["Score: ", brand.score] })] })),
                                            })) }) }), _jsx(Form.Item, { label: "Modelo (Opcional)", name: ["mattress", "model"], children: _jsx(Input, { placeholder: "Ej: ProAdapt, Posturepedic, etc." }) }), _jsx(Form.Item, { label: "Tama\u00F1o", name: ["mattress", "size"], rules: [{ required: true, message: "Selecciona el tamaño" }], initialValue: "queen", children: _jsx(Radio.Group, { buttonStyle: "solid", style: { width: "100%" }, children: _jsx(Row, { gutter: 8, children: MATTRESS_SIZES.map((size) => (_jsx(Col, { span: 8, children: _jsx(Radio.Button, { value: size.value, style: { width: "100%", textAlign: "center" }, children: _jsxs(Space, { children: [_jsx("span", { style: { fontSize: 20 }, children: size.icon }), size.label] }) }) }, size.value))) }) }) }), _jsx(Form.Item, { label: _jsxs(Space, { children: ["Edad del Colch\u00F3n", _jsxs(Text, { type: "secondary", children: ["(", mattressAge, " a\u00F1os)"] })] }), name: ["mattress", "age"], rules: [{ required: true, message: "Indica la edad del colchón" }], initialValue: 3, children: _jsx(Slider, { min: 2, max: 15, marks: {
                                                2: "2",
                                                5: "5",
                                                10: "10",
                                                15: "15+",
                                            }, value: mattressAge, onChange: setMattressAge }) }), _jsx(Form.Item, { label: "Condici\u00F3n del Colch\u00F3n", name: ["mattress", "condition"], rules: [{ required: true, message: "Selecciona la condición" }], initialValue: "good", children: _jsx(Radio.Group, { onChange: (e) => setMattressCondition(e.target.value), style: { width: "100%" }, children: _jsxs(Row, { gutter: [8, 8], children: [_jsx(Col, { span: 12, children: _jsx(Card, { hoverable: true, className: mattressCondition === "excellent" ? "ant-card-active" : "", onClick: () => setMattressCondition("excellent"), children: _jsx(Radio, { value: "excellent", children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "Excelente" }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "Como nuevo, sin manchas ni hundimientos" })] }) }) }) }), _jsx(Col, { span: 12, children: _jsx(Card, { hoverable: true, className: mattressCondition === "good" ? "ant-card-active" : "", onClick: () => setMattressCondition("good"), children: _jsx(Radio, { value: "good", children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "Bueno" }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "Uso normal, manchas m\u00EDnimas" })] }) }) }) }), _jsx(Col, { span: 12, children: _jsx(Card, { hoverable: true, className: mattressCondition === "fair" ? "ant-card-active" : "", onClick: () => setMattressCondition("fair"), children: _jsx(Radio, { value: "fair", children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "Regular" }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "Algunas manchas, ligero hundimiento" })] }) }) }) }), _jsx(Col, { span: 12, children: _jsx(Card, { hoverable: true, className: mattressCondition === "poor" ? "ant-card-active" : "", onClick: () => setMattressCondition("poor"), children: _jsx(Radio, { value: "poor", children: _jsxs(Space, { direction: "vertical", children: [_jsx(Text, { strong: true, children: "Malo" }), _jsx(Text, { type: "secondary", style: { fontSize: 12 }, children: "Manchas severas, hundimientos notables" })] }) }) }) })] }) }) })] }) }), _jsxs(Col, { xs: 24, lg: 12, children: [_jsxs(Card, { title: "Fotos del Colch\u00F3n", bordered: false, children: [_jsx(Alert, { message: "Requisitos de Fotos", description: "Sube al menos 3 fotos claras: vista general, etiqueta de marca, y cualquier da\u00F1o visible", type: "warning", showIcon: true, style: { marginBottom: 16 } }), _jsx(Form.Item, { name: "photos", rules: [
                                                {
                                                    validator: (_, value) => {
                                                        if (fileList.length < 3) {
                                                            return Promise.reject("Debes subir al menos 3 fotos");
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ], children: _jsxs(Dragger, { ...uploadProps, children: [_jsx("p", { className: "ant-upload-drag-icon", children: _jsx(CameraOutlined, { style: { fontSize: 48, color: "#1890ff" } }) }), _jsx("p", { className: "ant-upload-text", children: "Haz clic o arrastra fotos aqu\u00ED" }), _jsx("p", { className: "ant-upload-hint", children: "Sube al menos 3 fotos del colch\u00F3n. M\u00E1ximo 5MB por imagen." })] }) }), fileList.length > 0 && (_jsx(Alert, { message: `${fileList.length} fotos cargadas`, type: "success", showIcon: true, style: { marginTop: 16 } }))] }), _jsxs(Card, { title: "Cr\u00E9dito Estimado", bordered: false, style: { marginTop: 16 }, extra: _jsx(InfoCircleOutlined, { style: { fontSize: 16, color: "#1890ff" } }), children: [_jsxs("div", { style: { textAlign: "center", padding: "20px 0" }, children: [_jsxs(Title, { level: 1, style: { color: "#52c41a", margin: 0 }, children: ["$", estimatedCredit] }), _jsx(Text, { type: "secondary", children: "Cr\u00E9dito estimado basado en la informaci\u00F3n proporcionada" })] }), _jsx(Divider, {}), _jsxs(Paragraph, { type: "secondary", style: { fontSize: 12 }, children: [_jsx(InfoCircleOutlined, {}), " El cr\u00E9dito final ser\u00E1 determinado por nuestro sistema de IA despu\u00E9s de analizar las fotos. Este estimado es solo una referencia."] })] })] }), _jsx(Col, { span: 24, children: _jsx(Card, { title: "Informaci\u00F3n Adicional", bordered: false, children: _jsxs(Row, { gutter: 16, children: [_jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Empleado", name: "employeeId", rules: [{ required: true, message: "Selecciona el empleado" }], children: _jsxs(Select, { placeholder: "Seleccionar empleado...", children: [_jsx(Select.Option, { value: "emp-001", children: "Mar\u00EDa Garc\u00EDa" }), _jsx(Select.Option, { value: "emp-002", children: "John Smith" })] }) }) }), _jsx(Col, { xs: 24, md: 12, children: _jsx(Form.Item, { label: "Tienda", name: "storeId", rules: [{ required: true, message: "Selecciona la tienda" }], children: _jsxs(Select, { placeholder: "Seleccionar tienda...", children: [_jsx(Select.Option, { value: "store-001", children: "Studio City" }), _jsx(Select.Option, { value: "store-002", children: "Santa Monica" }), _jsx(Select.Option, { value: "online", children: "Online" })] }) }) })] }) }) })] }), _jsx(Row, { style: { marginTop: 16 }, children: _jsx(Col, { span: 24, children: _jsx(Button, { type: "dashed", onClick: () => {
                                console.log('Debug button clicked');
                                console.log('Form values:', formProps.form?.getFieldsValue());
                                console.log('Form errors:', formProps.form?.getFieldsError());
                                formProps.form?.submit();
                            }, children: "Debug Submit" }) }) })] }) }));
};
