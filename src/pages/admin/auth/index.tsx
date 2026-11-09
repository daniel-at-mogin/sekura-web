import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LoginCredentials,
  type LoginCredentialsValues,
} from "@/schemas/adminLogin";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const AdminAuth = () => {
  const form = useForm<LoginCredentialsValues>({
    resolver: zodResolver(LoginCredentials),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginCredentialsValues> = (data) =>
    console.log(data);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardContent>
          <form id="form-admin-auth" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="m@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={
                          passwordVisible ? "Hide password" : "Show password"
                        }
                        onClick={() =>
                          setPasswordVisible((visible) => !visible)
                        }
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {passwordVisible ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" form="form-admin-auth">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminAuth;
