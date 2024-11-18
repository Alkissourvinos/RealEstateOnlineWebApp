import { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};
/**
 * Custom FormProvider that uses React-Hook-Form
 * @params Methods, onSubmit
 */
export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
