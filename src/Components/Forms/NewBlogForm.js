import React, { useContext, useEffect, useRef } from "react";
import { Card, Col, Form } from "react-bootstrap";
import SubmitButton from "../SubmitButton";
import AuthContext from "../../store/auth-context";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const NewBlogForm = ({ onSubmit, isSubmitted }) => {
  const textAreaRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    textAreaRef.current.style.height = "300px";
  });
  return (
    <Formik
      initialValues={{
        name: "",
        category: "",
        content: "",
        blogUser: {
          id: 1,
          name: "ramesh",
          authority: "user",
          email: "ramesh@gmail.com",
        },
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, t("validation:atLeast", { number: 3 }))
          .max(30, t("validation:lessThan", { number: 30 }))
          .required(t("validation:required")),

        category: Yup.string()
          .min(5, t("validation:atLeast", { number: 5 }))
          .max(50, t("validation:lessThan", { number: 50 }))
          .required(t("validation:required")),

        content: Yup.string()
          .min(100, t("validation:atLeast", { number: 100 }))
          .max(5000, t("validation:lessThan", { number: 5000 }))
          .required(t("validation:required")),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Col>
          <Card className="boxShadow">
            <Card.Header className="fst-italic">{`${t("newPostBy")} ${
              authCtx.userName
            }`}</Card.Header>
            <Card.Body className="m-2 pb-3 border rounded-3">
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>{t("name")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("enterNewPostHere")}
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    disabled={isSubmitted}
                    isValid={
                      formik.touched.name &&
                      !formik.errors.name &&
                      formik.values.name
                    }
                    isInvalid={formik.touched.name && formik.errors.name}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>{t("Category")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t("Enter category here")}
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                    disabled={isSubmitted}
                    isValid={
                      formik.touched.category &&
                      !formik.errors.category &&
                      formik.values.category
                    }
                    isInvalid={
                      formik.touched.category && formik.errors.category
                    }
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="my-2" controlId="content">
                  <Form.Label>{t("content")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    disabled={isSubmitted}
                    isValid={
                      formik.touched.content &&
                      !formik.errors.content &&
                      formik.values.content
                    }
                    isInvalid={formik.touched.content && formik.errors.content}
                    ref={textAreaRef}
                    as="textarea"
                    style={{ overflow: "hidden" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.content}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <SubmitButton
                    isSubmitted={isSubmitted}
                    isSubmitting={formik.isSubmitting}
                    name={t("Add New Blog")}
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Formik>
  );
};

export default NewBlogForm;
