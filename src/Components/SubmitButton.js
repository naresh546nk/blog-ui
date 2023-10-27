import React from "react";
import { Button, Spinner } from "react-bootstrap";

const SubmitButton = ({
  isSubmitting,
  isSubmitted,
  isDisabled,
  name,
  variant,
  type,
  onClick,
}) => {
  return (
    <div className="d-flex justify-content-end">
      <Button
        variant={variant || "outline-primary"}
        className={`${
          isSubmitting ? "disabled button" : "button"
        } ms-1 ${isDisabled}? "dissabled button": "active"`}
        type={type || "submit"}
        disabled={isSubmitting || isSubmitted || isDisabled}
        onClick={onClick}
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className={`${!isSubmitting && "visually-hidden"}`}
        />
        <span className="ms-1">{!isSubmitting ? name : "Submitting"}</span>
      </Button>
    </div>
  );
};

export default SubmitButton;
