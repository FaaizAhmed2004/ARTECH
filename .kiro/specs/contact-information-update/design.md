# Design Document

## Overview

This design outlines the systematic update of business contact information across the entire website to reflect the new Canadian business details. The approach focuses on centralized data management through the constants file, ensuring consistency and maintainability while adding the Canadian business registration number to establish business legitimacy.

## Architecture

### Data Flow Architecture

```
lib/constants.ts (BUSINESS_INFO)
    ↓
Components & Pages
    ↓
Rendered Contact Information
```

The architecture maintains the existing centralized approach where all business information flows from a single source of truth in `lib/constants.ts`. This ensures that updates propagate automatically to all consuming components and pages.

### Update Strategy

1. **Central Update**: Modify the `BUSINESS_INFO` object in `lib/constants.ts`
2. **Automatic Propagation**: All components and pages automatically receive updated information
3. **Footer Enhancement**: Add Canadian business registration to footer component
4. **Validation**: Ensure all references are updated and no old information remains

## Components and Interfaces

### BusinessInfo Interface Updates

The existing `BusinessInfo` interface in `lib/types.ts` will be extended to support Canadian business registration:

```typescript
export interface BusinessInfo {
  name: string;
  owner: string;
  registrationNumber?: string; // New field for Canadian business registration
  address: {
    street: string;
    city: string;
    state: string; // Will be used for province in Canadian context
    zipCode: string; // Will be used for postal code
    full: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  businessType: string;
}
```

### Constants File Structure

The updated `BUSINESS_INFO` object will contain:

```typescript
export const BUSINESS_INFO: BusinessInfo = {
  name: 'Arktech5',
  owner: 'Adeel Shafiq', // Updated owner name
  registrationNumber: '17402325 CANADA INC.',
  address: {
    street: '3174 Tacc drive',
    city: 'Mississauga',
    state: 'ON', // Province
    zipCode: 'L5M 0B6',
    full: '3174 Tacc drive, Mississauga, ON, L5M 0B6'
  },
  contact: {
    email: 'raoadeelshafiq@gmail.com',
    phone: '+1 437 254 3111'
  },
  businessType: 'Canadian Corporation'
};
```

### Component Updates

#### Footer Component Enhancement

The footer will be updated to prominently display the Canadian business registration:

1. **Company Information Section**: Add registration number display
2. **Bottom Bar**: Include registration number in copyright area
3. **Legal Indicators**: Update business type indicators

#### Header Component

The header already uses `BUSINESS_INFO.contact` for phone and email display, so it will automatically update when constants are changed.

#### Policy Pages

All policy pages that reference business information will automatically update through their use of the `BUSINESS_INFO` constant.

## Data Models

### Contact Information Model

```typescript
interface ContactInfo {
  email: string;        // raoadeelshafiq@gmail.com
  phone: string;        // +1 437 254 3111
  displayPhone: string; // Formatted for display
  emailHref: string;    // mailto: link
  phoneHref: string;    // tel: link
}
```

### Address Model

```typescript
interface BusinessAddress {
  street: string;    // 3174 Tacc drive
  city: string;      // Mississauga
  province: string;  // ON (using state field)
  postalCode: string; // L5M 0B6 (using zipCode field)
  country: string;   // Canada (implied)
  full: string;      // Complete formatted address
}
```

### Registration Model

```typescript
interface BusinessRegistration {
  number: string;      // 17402325 CANADA INC.
  type: string;        // Canadian Corporation
  jurisdiction: string; // Canada
}
```

## Error Handling

### Validation Strategy

1. **Email Validation**: Ensure email format is valid
2. **Phone Validation**: Verify Canadian phone number format
3. **Address Validation**: Check postal code format (Canadian format)
4. **Registration Validation**: Ensure registration number is properly formatted

### Fallback Mechanisms

1. **Missing Data**: Graceful degradation if any contact field is missing
2. **Link Validation**: Ensure mailto and tel links are properly formatted
3. **Display Fallbacks**: Default text if contact information is unavailable

### Error Prevention

1. **Type Safety**: Use TypeScript interfaces to prevent data structure errors
2. **Constant Validation**: Validate constants at build time
3. **Link Testing**: Ensure all contact links function properly

## Testing Strategy

### Unit Testing

1. **Constants Validation**: Test that all required fields are present and properly formatted
2. **Component Rendering**: Verify components display updated contact information
3. **Link Functionality**: Test mailto and tel links work correctly
4. **Address Formatting**: Ensure Canadian address format is correct

### Integration Testing

1. **Cross-Component Consistency**: Verify contact information is consistent across all components
2. **Page-Level Testing**: Test contact information display on all relevant pages
3. **Footer Integration**: Verify Canadian registration number appears correctly

### Visual Testing

1. **Layout Verification**: Ensure contact information displays properly in all layouts
2. **Responsive Testing**: Verify contact information is readable on all screen sizes
3. **Footer Appearance**: Confirm registration number is prominently displayed

### Manual Testing Checklist

1. **Header Contact Links**: Click phone and email links in header
2. **Footer Information**: Verify all contact details and registration number
3. **Policy Pages**: Check contact information in all policy pages
4. **Contact Page**: Verify contact form and information display
5. **FAQ Page**: Confirm contact references are updated

## Implementation Approach

### Phase 1: Core Data Update
- Update `BUSINESS_INFO` constant with new contact information
- Add registration number field to interface
- Update business type and owner information

### Phase 2: Footer Enhancement
- Add registration number display to footer
- Update business type indicators
- Enhance legal information section

### Phase 3: Validation and Testing
- Verify all components display updated information
- Test all contact links functionality
- Ensure no old information remains

### Phase 4: Quality Assurance
- Cross-browser testing of contact links
- Mobile responsiveness verification
- SEO and accessibility compliance check

## Security Considerations

1. **Email Protection**: Consider email obfuscation if spam becomes an issue
2. **Phone Number Format**: Use standard international format for clarity
3. **Address Privacy**: Ensure address information is appropriate for public display
4. **Registration Number**: Verify it's appropriate to display business registration publicly

## Performance Impact

The changes will have minimal performance impact as they involve:
- Static data updates in constants file
- No additional API calls or external dependencies
- Existing component structure remains unchanged
- No new heavy components or libraries required