// Script de correcciones masivas para errores de TypeScript
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface FileCorrection {
  path: string;
  corrections: Array<{
    search: string | RegExp;
    replace: string;
  }>;
}

const corrections: FileCorrection[] = [
  // Scripts
  {
    path: 'src/pages/scripts/create.tsx',
    corrections: [
      { search: 'const { Title, Text } = Typography;', replace: 'const { Text } = Typography;' }
    ]
  },
  {
    path: 'src/pages/scripts/edit.tsx',
    corrections: [
      { search: 'const { Title, Text } = Typography;', replace: 'const { Text } = Typography;' }
    ]
  },
  {
    path: 'src/pages/scripts/list.tsx',
    corrections: [
      { search: /import { Link } from "react-router-dom";\n/, replace: '' },
      { search: /\n\s*CalendarOutlined,/, replace: '' },
      { search: 'import type { IScript, IEmployee } from "../../interfaces";', replace: 'import type { IScript } from "../../interfaces";' }
    ]
  },
  {
    path: 'src/pages/scripts/show.tsx',
    corrections: [
      { search: /\n\s*Timeline,/, replace: '' },
      { search: /\n\s*UserOutlined,/, replace: '' },
      { search: /\n\s*CalendarOutlined,/, replace: '' }
    ]
  },
  // Subscriptions
  {
    path: 'src/pages/subscriptions/create.tsx',
    corrections: [
      { search: /\n\s*InputNumber,/, replace: '' },
      { search: ', CalendarOutlined', replace: '' },
      { search: /\.toLowerCase\(\)/g, replace: '?.toString().toLowerCase()' },
      { search: 'onFinish={handleFinish}', replace: 'onFinish={handleFinish as any}' }
    ]
  },
  {
    path: 'src/pages/subscriptions/edit.tsx',
    corrections: [
      { search: ', UserOutlined, CalendarOutlined', replace: '' },
      { search: /\.toLowerCase\(\)/g, replace: '?.toString().toLowerCase()' }
    ]
  },
  {
    path: 'src/pages/subscriptions/show.tsx',
    corrections: [
      { search: /\n\s*Timeline,/, replace: '' },
      { search: /\n\s*DollarOutlined,/, replace: '' },
      { search: /\n\s*ClockCircleOutlined,/, replace: '' },
      { search: 'render: (_, record) => (', replace: 'render: (_) => (' }
    ]
  },
  {
    path: 'src/pages/subscriptions/list.tsx',
    corrections: [
      { search: /open\(/g, replace: 'open?.(' },
      { search: /hide\?\.\(\)/g, replace: 'hide?.()' },
      { search: /type: 'info'/g, replace: 'type: "success"' }
    ]
  },
  // Shopify
  {
    path: 'src/pages/shopify/coupons/create.tsx',
    corrections: [
      { search: /parser=\{[^}]+\}/g, replace: 'parser={(value: any) => parseFloat(value?.replace(/[%$,]/g, "") || "0") as any}' },
      { search: 'onFinish={handleFinish}', replace: 'onFinish={handleFinish as any}' },
      { search: ', useEffect', replace: '' }
    ]
  },
  {
    path: 'src/pages/shopify/coupons/edit.tsx',
    corrections: [
      { search: /\n\s*DatePicker,/, replace: '' },
      { search: /parser=\{[^}]+\}/g, replace: 'parser={(value: any) => parseFloat(value?.replace(/[%$,]/g, "") || "0") as any}' }
    ]
  },
  {
    path: 'src/pages/shopify/coupons/list.tsx',
    corrections: [
      { search: ', PlusOutlined', replace: '' },
      { search: /open\(/g, replace: 'open?.(' },
      { search: /fixed: "right"/g, replace: 'fixed: "right" as const' },
      { search: /fixed: "left"/g, replace: 'fixed: "left" as const' }
    ]
  },
  {
    path: 'src/pages/shopify/coupons/show.tsx',
    corrections: [
      { search: ', Divider', replace: '' },
      { search: ', DollarOutlined', replace: '' },
      { search: 'const { Title, Text } = Typography;', replace: 'const { Text } = Typography;' }
    ]
  },
  {
    path: 'src/pages/shopify/customers/edit.tsx',
    corrections: [
      { search: ', PlusOutlined', replace: '' }
    ]
  },
  {
    path: 'src/pages/shopify/customers/list.tsx',
    corrections: [
      { search: /open\(/g, replace: 'open?.(' },
      { search: /type: "info"/g, replace: 'type: "success"' },
      { search: /align: "center"/g, replace: 'align: "center" as const' },
      { search: /align: "right"/g, replace: 'align: "right" as const' },
      { search: 'const handleMergeWithLocal = (shopifyCustomer: IShopifyCustomer) => {', replace: 'const handleMergeWithLocal = () => {' }
    ]
  },
  {
    path: 'src/pages/shopify/products/edit.tsx',
    corrections: [
      { search: ', Space,', replace: ',' }
    ]
  },
  {
    path: 'src/pages/shopify/products/list.tsx',
    corrections: [
      { search: ', DeleteButton', replace: '' },
      { search: ', TextField', replace: '' },
      { search: ', EditOutlined', replace: '' },
      { search: /open\(/g, replace: 'open?.(' },
      { search: /align: "center"/g, replace: 'align: "center" as const' },
      { search: /align: "right"/g, replace: 'align: "right" as const' },
      { search: 'const handleQuickPriceUpdate = (productId: string, variantId: string, newPrice: number) => {', replace: 'const handleQuickPriceUpdate = () => {' }
    ]
  },
  {
    path: 'src/pages/shopify/products/show.tsx',
    corrections: [
      { search: 'import { Show, TextField, DateField, TagField, NumberField } from "@refinedev/antd";', replace: 'import { Show, DateField } from "@refinedev/antd";' },
      { search: 'const { Title, Text } = Typography;', replace: '// Typography destructuring removed' },
      { search: '{record.images.map((img: any, index: number) => (', replace: '{record.images.map((img: any) => (' }
    ]
  },
  {
    path: 'src/pages/shopify/settings/settings.tsx',
    corrections: [
      { search: ', Tag,', replace: ',' },
      { search: 'const { Title, Text, Paragraph } = Typography;', replace: 'const { Text } = Typography;' },
      { search: /open\(/g, replace: 'open?.(' },
      { search: /type: "info"/g, replace: 'type: "success"' },
      { search: 'if (!values.shopifyDomain || !values.accessToken) {', replace: 'if (!(values as any).shopifyDomain || !(values as any).accessToken) {' }
    ]
  },
  // Webhooks
  {
    path: 'src/pages/webhooks/list.tsx',
    corrections: [
      { search: /open\(/g, replace: 'open?.(' },
      { search: /fixed: "right"/g, replace: 'fixed: "right" as const' },
      { search: '<style jsx>', replace: '<style>' }
    ]
  },
  {
    path: 'src/pages/webhooks/settings.tsx',
    corrections: [
      { search: ', Tag,', replace: ',' },
      { search: ', Switch,', replace: ',' },
      { search: 'const { Title, Text, Paragraph } = Typography;', replace: 'const { Title, Text } = Typography;' }
    ]
  },
  {
    path: 'src/pages/webhooks/show.tsx',
    corrections: [
      { search: ', Divider,', replace: ',' },
      { search: 'import { ApiOutlined, InfoCircleOutlined, CodeOutlined, FileTextOutlined } from "@ant-design/icons";', replace: 'import { InfoCircleOutlined, CodeOutlined, FileTextOutlined } from "@ant-design/icons";' },
      { search: 'const { Title, Text, Paragraph } = Typography;', replace: 'const { Text } = Typography;' }
    ]
  },
  // Others
  {
    path: 'src/pages/StripeManagement.tsx',
    corrections: [
      { search: 'const [loading, setLoading] = useState(true);', replace: 'const [, setLoading] = useState(true);' }
    ]
  },
  {
    path: 'src/pages/tasks/index.tsx',
    corrections: [
      { search: /\n\s*Divider/, replace: '' },
      { search: /\n\s*EditOutlined,/, replace: '' }
    ]
  },
  // Providers
  {
    path: 'src/providers/accessControlProvider.ts',
    corrections: [
      { search: 'const managerRestricted = {', replace: 'const managerRestricted: Record<string, string[] | undefined> = {' },
      { search: 'const agentAllowed = {', replace: 'const agentAllowed: Record<string, string[] | undefined> = {' },
      { search: 'const RESOURCE_ACTIONS = {', replace: 'const RESOURCE_ACTIONS: Record<string, string[]> = {' },
      { search: 'const checkPermission = (resource: string,', replace: 'const checkPermission = (resource: string | undefined,' },
      { search: 'return checkPermission(resource,', replace: 'return checkPermission(resource || "",' },
      { search: 'can: async ({ resource, action, params }) => {', replace: 'can: async ({ resource, action }) => {' }
    ]
  },
  {
    path: 'src/providers/dataProvider.ts',
    corrections: [
      { search: 'getList: async ({ resource, pagination, filters, sorters }) => {', replace: 'getList: async ({ resource, filters }) => {' },
      { search: /\bid,/g, replace: 'id.toString(),' },
      { search: 'custom: async ({ url, method, filters, sorters, payload, query, headers }) => {', replace: 'custom: async ({ url, method, payload, query, headers }) => {' }
    ]
  },
  {
    path: 'src/services/activityLogService.ts',
    corrections: [
      { search: 'const user = authProvider.getIdentity();', replace: 'const user = await authProvider.getIdentity() as any;' },
      { search: /action,$/m, replace: 'action as any,' }
    ]
  },
  {
    path: 'src/services/stripeService.ts',
    corrections: [
      { search: /\n\s*StripeApiResponse/, replace: '' }
    ]
  }
];

// Aplicar correcciones
console.log('🔧 Aplicando correcciones de TypeScript...\n');

let successCount = 0;
let errorCount = 0;

for (const file of corrections) {
  const filePath = join(process.cwd(), file.path);
  
  if (!existsSync(filePath)) {
    console.error(`❌ No encontrado: ${file.path}`);
    errorCount++;
    continue;
  }
  
  try {
    let content = readFileSync(filePath, 'utf-8');
    let modified = false;
    
    for (const correction of file.corrections) {
      const originalContent = content;
      
      if (typeof correction.search === 'string') {
        content = content.replace(correction.search, correction.replace);
      } else {
        content = content.replace(correction.search, correction.replace);
      }
      
      if (originalContent !== content) {
        modified = true;
      }
    }
    
    if (modified) {
      writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Actualizado: ${file.path}`);
      successCount++;
    } else {
      console.log(`⏭️  Sin cambios: ${file.path}`);
    }
  } catch (error) {
    console.error(`❌ Error en ${file.path}: ${error}`);
    errorCount++;
  }
}

console.log(`\n📊 Resumen:`);
console.log(`   ✅ Archivos actualizados: ${successCount}`);
console.log(`   ❌ Errores: ${errorCount}`);
console.log(`\n✨ Correcciones completadas!`);
