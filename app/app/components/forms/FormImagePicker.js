  
import React from 'react';
import { FormikContextType, FormikValues, useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import ImageInputList from '../ImageInputList';

export default function FormImagePicker({ name }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const imageUris = values[name];
    
    const handleImageAdd = (imageUri) => {
        setFieldValue(name, [...imageUris, imageUri]);
    };

    const handleImageRemove = (imageUri) => {
        setFieldValue(
            name,
            imageUris.filter((uri) => uri !== imageUri)
        );
    };

    return (
        <>
            <ImageInputList
                imageUris={imageUris}
                onImageAdd={handleImageAdd}
                onImageRemove={handleImageRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}