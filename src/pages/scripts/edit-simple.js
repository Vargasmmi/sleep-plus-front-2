import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Card, Alert, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
export const ScriptEditSimple = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { formProps, saveButtonProps, queryResult } = useForm({
        resource: "scripts",
        id: id,
        action: "edit",
    });
    const scriptData = queryResult?.data?.data;
    console.log("ScriptEditSimple - Debug Info:", {
        id,
        isLoading: queryResult?.isLoading,
        isError: queryResult?.isError,
        error: queryResult?.error,
        scriptData,
        queryResult
    });
    if (queryResult?.isLoading) {
        return (_jsxs("div", { style: { textAlign: 'center', padding: '50px' }, children: [_jsx("h2", { children: "Cargando script..." }), _jsxs("p", { children: ["ID: ", id] })] }));
    }
    if (queryResult?.isError) {
        return (_jsx(Alert, { message: "Error al cargar el script", description: _jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "ID solicitado:" }), " ", id] }), _jsxs("p", { children: [_jsx("strong", { children: "Error:" }), " ", queryResult.error?.message || "Error desconocido"] }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", queryResult.error?.response?.status] }), _jsx(Button, { onClick: () => navigate('/scripts'), children: "Volver a la lista" })] }), type: "error", showIcon: true, style: { margin: '20px' } }));
    }
    if (!scriptData) {
        return (_jsx(Alert, { message: "Script no encontrado", description: _jsxs("div", { children: [_jsxs("p", { children: ["No se encontr\u00F3 el script con ID: ", id] }), _jsx(Button, { onClick: () => navigate('/scripts'), children: "Volver a la lista" })] }), type: "warning", showIcon: true, style: { margin: '20px' } }));
    }
    return (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h1", { children: "Editar Script (Versi\u00F3n Simple)" }), _jsxs("p", { children: [_jsx("strong", { children: "ID:" }), " ", id] }), _jsxs("p", { children: [_jsx("strong", { children: "Datos cargados:" }), " ", scriptData ? 'Sí' : 'No'] }), _jsx(Edit, { title: `Editando: ${scriptData.name || 'Sin nombre'}`, saveButtonProps: saveButtonProps, children: _jsxs(Form, { ...formProps, layout: "vertical", children: [_jsxs(Card, { title: "Informaci\u00F3n B\u00E1sica", bordered: false, children: [_jsx(Form.Item, { label: "Nombre del Script", name: "name", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "Nombre del script" }) }), _jsx(Form.Item, { label: "Tipo", name: "type", rules: [{ required: true, message: "Selecciona un tipo" }], children: _jsxs(Select, { placeholder: "Seleccionar tipo", children: [_jsx(Select.Option, { value: "cold", children: "Llamada fr\u00EDa" }), _jsx(Select.Option, { value: "warm", children: "Llamada c\u00E1lida" }), _jsx(Select.Option, { value: "winback", children: "Recuperaci\u00F3n" }), _jsx(Select.Option, { value: "renewal", children: "Renovaci\u00F3n" })] }) }), _jsx(Form.Item, { label: "Versi\u00F3n", name: "version", rules: [{ required: true, message: "Este campo es requerido" }], children: _jsx(Input, { placeholder: "1.0" }) }), _jsx(Form.Item, { label: "Estado", name: "status", children: _jsxs(Select, { children: [_jsx(Select.Option, { value: "draft", children: "Borrador" }), _jsx(Select.Option, { value: "active", children: "Activo" }), _jsx(Select.Option, { value: "archived", children: "Archivado" })] }) })] }), _jsx(Card, { title: "Debug Info", style: { marginTop: 16 }, children: _jsx("pre", { children: JSON.stringify(scriptData, null, 2) }) })] }) })] }));
};
