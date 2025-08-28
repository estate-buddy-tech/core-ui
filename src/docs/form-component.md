# Form Components

This directory contains reusable form components that provide consistent design and behavior across the application.

## Components

### FormField

A reusable form field component that handles labels, inputs, error messages, and validation.

```tsx
import { FormField } from "@/components/Form";
<FormField
  label="Name"
  name="name"
  type="text"
  required={true}
  error={errorFields?.name}
  onChange={(value) => onRemoveError("name", value)}
  autoFocus={true}
  placeholder="Enter name"
/>;
```

**Props:**

- `label`: Field label text
- `name`: Input name attribute
- `type`: Input type ('text', 'email', 'password', 'url', 'textarea')
- `required`: Whether the field is required
- `error`: Error message to display
- `onChange`: Callback when value changes
- `onBlur`: Callback when field loses focus
- `placeholder`: Input placeholder text
- `autoFocus`: Whether to auto-focus the field
- `disabled`: Whether the field is disabled
- `className`: Additional CSS classes
- `children`: Custom input element (overrides default input)

### FormWrapper

A complete form wrapper that provides consistent form layout with Remix Form handling.

```tsx
import { FormWrapper } from "@/components/Form";
<FormWrapper
  title="Create Item"
  method="POST"
  onCancel={() => navigate("/back")}
  isSubmitting={state === "submitting"}
  hiddenInputs={{
    token: token,
    workspace_id: params.workspace_id,
  }}
>
  <FormField
    label="Name"
    name="name"
    required
    error={errorFields?.name}
    onChange={(value) => onRemoveError("name", value)}
  />

  <FormField label="Description" name="description" type="textarea" />
</FormWrapper>;
```

**Props:**

- `title`: Form title
- `method`: HTTP method ('POST', 'PUT', 'PATCH', 'DELETE')
- `onCancel`: Cancel button callback
- `submitText`: Submit button text
- `cancelText`: Cancel button text
- `isSubmitting`: Whether form is submitting
- `className`: Additional CSS classes
- `showActions`: Whether to show action buttons
- `actions`: Custom action buttons
- `hiddenInputs`: Object of hidden input fields

## Migration Guide

### Before (Old Pattern)

```tsx
<div className="coreui-content-center">
  <Card className="coreui-card-center">
    <CardHeader>
      <CardTitle>Create Plugin</CardTitle>
    </CardHeader>
    <CardContent className="px-6 pb-5">
      <Form method="POST">
        <input name="token" value={token} className="hidden" />
        <div className="mb-3">
          <Label htmlFor="name" className="required">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            onChange={(e) => onRemoveError("name", e.target.value)}
            className={cn(errorFields?.name && "input-error")}
          />
          {errorFields?.name && (
            <span className="error-message">{errorFields.name}</span>
          )}
        </div>
        <div className="mt-10 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={state === "submitting"}>
            {state === "submitting" ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </CardContent>
  </Card>
</div>
```

### After (New Pattern)

```tsx
<FormWrapper
  title="Create Plugin"
  onCancel={onCancel}
  isSubmitting={state === "submitting"}
  hiddenInputs={{ token }}
>
  <FormField
    label="Name"
    name="name"
    required
    error={errorFields?.name}
    onChange={(value) => onRemoveError("name", value)}
  />
</FormWrapper>
```

## Benefits

1. **Consistency**: All forms follow the same design pattern
2. **Reusability**: Common form patterns are abstracted into components
3. **Maintainability**: Changes to form styling/behavior can be made in one place
4. **Type Safety**: TypeScript interfaces ensure proper prop usage
5. **Accessibility**: Built-in accessibility features (labels, error messages, etc.)
6. **Reduced Boilerplate**: Less repetitive code in form implementations
