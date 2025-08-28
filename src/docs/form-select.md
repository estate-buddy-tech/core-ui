# FormSelect Component

A reusable form select component that follows the same pattern as FormField, providing consistent styling, error handling, and accessibility features.

## Features

- ✅ Consistent styling with other form components
- ✅ Error handling and validation
- ✅ Loading states
- ✅ Support for icons in options
- ✅ Required field indication
- ✅ Disabled state
- ✅ Customizable placeholder and empty state text
- ✅ **Custom actions/buttons within select content**
- ✅ TypeScript support

## Usage

```tsx
import { FormSelect, SelectOption, SelectAction } from '@/components/misc/FormSelect'

// Define your options
const options: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', icon: <SomeIcon /> },
  { value: 'option3', label: 'Option 3' },
]

// Define actions (optional)
const actions: SelectAction[] = [
  {
    label: 'Create New',
    icon: <Plus size={16} />,
    onClick: () => console.log('Create new clicked'),
  },
]

// Use in your component
<FormSelect
  label="Select an Option"
  name="my-select"
  value={selectedValue}
  options={options}
  actions={actions}
  required
  error={errorMessage}
  onValueChange={handleValueChange}
/>
```

## Props

| Prop            | Type                      | Default                  | Description                                           |
| --------------- | ------------------------- | ------------------------ | ----------------------------------------------------- |
| `label`         | `string`                  | -                        | The label text for the select field                   |
| `name`          | `string`                  | -                        | The name attribute for the select field               |
| `value`         | `string`                  | -                        | The currently selected value                          |
| `options`       | `SelectOption[]`          | -                        | Array of options to display                           |
| `required`      | `boolean`                 | `false`                  | Whether the field is required                         |
| `disabled`      | `boolean`                 | `false`                  | Whether the field is disabled                         |
| `placeholder`   | `string`                  | `'Select an option'`     | Placeholder text when no option is selected           |
| `error`         | `string`                  | -                        | Error message to display                              |
| `onValueChange` | `(value: string) => void` | -                        | Callback when value changes                           |
| `className`     | `string`                  | -                        | Additional CSS classes                                |
| `loading`       | `boolean`                 | `false`                  | Whether to show loading state                         |
| `loadingText`   | `string`                  | `'Loading...'`           | Text to show when loading                             |
| `emptyText`     | `string`                  | `'No options available'` | Text to show when no options                          |
| `actions`       | `SelectAction[]`          | `[]`                     | Array of action buttons to show in dropdown           |
| `showSeparator` | `boolean`                 | `true`                   | Whether to show separator between options and actions |

## SelectOption Interface

```tsx
interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}
```

## SelectAction Interface

```tsx
interface SelectAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}
```

## Examples

### Basic Usage

```tsx
<FormSelect
  label="Country"
  name="country"
  value={selectedCountry}
  options={countryOptions}
  onValueChange={setSelectedCountry}
/>
```

### With Icons

```tsx
const options = [
  { value: 'github', label: 'GitHub', icon: <GitHubIcon /> },
  { value: 'gitlab', label: 'GitLab', icon: <GitLabIcon /> },
]

<FormSelect
  label="Repository Type"
  name="repo-type"
  value={selectedRepo}
  options={options}
  onValueChange={setSelectedRepo}
/>
```

### With Single Action

```tsx
import { Plus } from 'lucide-react'

const createAction: SelectAction = {
  label: 'Create New Credential',
  icon: <Plus size={16} />,
  onClick: () => {
    // Open modal or navigate to create page
    openCreateModal()
  },
}

<FormSelect
  label="Credential"
  name="credential"
  value={selectedCredential}
  options={credentialOptions}
  actions={[createAction]}
  onValueChange={setSelectedCredential}
/>
```

### With Multiple Actions

```tsx
import { Plus, Edit, Trash2 } from 'lucide-react'

const actions: SelectAction[] = [
  {
    label: 'Create New',
    icon: <Plus size={16} />,
    onClick: () => openCreateModal(),
  },
  {
    label: 'Edit Selected',
    icon: <Edit size={16} />,
    onClick: () => editSelected(),
    variant: 'outline',
  },
  {
    label: 'Delete Selected',
    icon: <Trash2 size={16} />,
    onClick: () => deleteSelected(),
    variant: 'destructive',
  },
]

<FormSelect
  label="Options"
  name="options"
  value={selectedValue}
  options={options}
  actions={actions}
  onValueChange={setSelectedValue}
/>
```

### With Custom Action Styling

```tsx
const customAction: SelectAction = {
  label: 'Custom Action',
  icon: <CustomIcon />,
  onClick: () => customAction(),
  variant: 'secondary',
  size: 'default',
  className: 'text-blue-600 hover:text-blue-700',
}

<FormSelect
  label="Custom Styled"
  name="custom"
  value={selectedValue}
  options={options}
  actions={[customAction]}
  onValueChange={setSelectedValue}
/>
```

### Without Separator

```tsx
<FormSelect
  label="No Separator"
  name="no-separator"
  value={selectedValue}
  options={options}
  actions={actions}
  showSeparator={false}
  onValueChange={setSelectedValue}
/>
```

### With Error Handling

```tsx
<FormSelect
  label="Required Field"
  name="required-field"
  value={value}
  options={options}
  required
  error={errors.fieldName}
  actions={[createAction]}
  onValueChange={(newValue) => {
    setValue(newValue);
    // Clear error when user selects something
    if (errors.fieldName) {
      setErrors((prev) => ({ ...prev, fieldName: "" }));
    }
  }}
/>
```

### Loading State

```tsx
<FormSelect
  label="Loading Options"
  name="loading-field"
  value=""
  options={[]}
  loading
  loadingText="Fetching options..."
/>
```

### Disabled State

```tsx
<FormSelect
  label="Disabled Field"
  name="disabled-field"
  value="option1"
  options={options}
  disabled
/>
```

## Styling

The component uses the same styling patterns as other form components in the project:

- Error states use the `input-error` class
- Required fields show a red asterisk
- Consistent spacing and typography
- Responsive design
- Action buttons use the same button variants as the rest of the UI

## Integration with Forms

The FormSelect component works seamlessly with form libraries and validation:

```tsx
// With React Hook Form
<FormSelect
  label="Select Option"
  name="mySelect"
  value={watch('mySelect')}
  options={options}
  actions={actions}
  error={errors.mySelect?.message}
  onValueChange={(value) => setValue('mySelect', value)}
/>

// With Remix forms
<FormSelect
  label="Select Option"
  name="mySelect"
  value={selectedValue}
  options={options}
  actions={actions}
  error={actionData?.errors?.mySelect}
  onValueChange={setSelectedValue}
/>
```

## Real-world Example

Here's how you might use it in a plugin creation form (similar to your existing implementation):

```tsx
import { Plus } from 'lucide-react'

const credentialOptions = credentials.map(cred => ({
  value: cred.id,
  label: cred.name,
  icon: <CredentialType type={cred.type} />,
}))

const createCredentialAction: SelectAction = {
  label: 'Create New Credential',
  icon: <Plus size={16} />,
  onClick: () => dialogFormCredentialRef.current?.onOpen(),
}

<FormSelect
  label="Credential"
  name="credential_id"
  value={selectedCredential?.id}
  options={credentialOptions}
  actions={[createCredentialAction]}
  onValueChange={(value) => {
    const credential = credentials.find((cred) => cred.id === value)
    setSelectedCredential(credential)
  }}
/>
```
