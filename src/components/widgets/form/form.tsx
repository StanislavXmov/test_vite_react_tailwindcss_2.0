import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormValues {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	comment: string;
}

export function Form() {
	const [step, setStep] = useState<1 | 2>(1);

	const form = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			age: 0,
			comment: "",
		} as FormValues,
		onSubmit: ({ value }) => {
			console.log("Form submitted:", value);
		},
	});

	const nextStep = () => {
		if (step === 1) {
			const firstNameValid = form.getFieldValue("firstName").length > 0;
			const lastNameValid = form.getFieldValue("lastName").length > 0;
			if (firstNameValid && lastNameValid) {
				setStep(2);
			} else {
				form.validateField("firstName", "change");
				form.validateField("lastName", "change");
			}
		}
	};

	const prevStep = () => setStep(1);

	return (
		<Card className="mx-auto mt-8 w-full max-w-md">
			<CardHeader>
				<CardTitle>Шаг {step} из 2</CardTitle>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="flex flex-col gap-4"
				>
					{step === 1 && (
						<>
							<form.Field
								name="firstName"
								validators={{
									onChange: ({ value }) =>
										value.length === 0 ? "Введите имя" : undefined,
								}}
							>
								{(field) => (
									<div className="flex flex-col gap-1.5">
										<Label htmlFor={field.name}>Имя</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<span className="text-destructive text-sm">
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>
							<form.Field
								name="lastName"
								validators={{
									onChange: ({ value }) =>
										value.length === 0 ? "Введите фамилию" : undefined,
								}}
							>
								{(field) => (
									<div className="flex flex-col gap-1.5">
										<Label htmlFor={field.name}>Фамилия</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<span className="text-destructive text-sm">
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>
							<Button type="button" onClick={nextStep}>
								Далее
							</Button>
						</>
					)}

					{step === 2 && (
						<>
							<form.Field
								name="email"
								validators={{
									onChange: ({ value }) =>
										!value.includes("@")
											? "Введите корректный email"
											: undefined,
								}}
							>
								{(field) => (
									<div className="flex flex-col gap-1.5">
										<Label htmlFor={field.name}>Email</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<span className="text-destructive text-sm">
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>
							<form.Field
								name="age"
								validators={{
									onChange: ({ value }) =>
										value <= 0 ? "Введите возраст" : undefined,
								}}
							>
								{(field) => (
									<div className="flex flex-col gap-1.5">
										<Label htmlFor={field.name}>Возраст</Label>
										<Input
											id={field.name}
											name={field.name}
											type="number"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) =>
												field.handleChange(e.target.valueAsNumber)
											}
										/>
										{field.state.meta.errors.length > 0 && (
											<span className="text-destructive text-sm">
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>
							<form.Field
								name="comment"
								validators={{
									onChange: ({ value }) =>
										value.length === 0 ? "Введите комментарий" : undefined,
								}}
							>
								{(field) => (
									<div className="flex flex-col gap-1.5">
										<Label htmlFor={field.name}>Комментарий</Label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.length > 0 && (
											<span className="text-destructive text-sm">
												{field.state.meta.errors.join(", ")}
											</span>
										)}
									</div>
								)}
							</form.Field>
							<div className="flex gap-2">
								<Button type="button" variant="outline" onClick={prevStep}>
									Назад
								</Button>
								<Button type="submit">Отправить</Button>
							</div>
						</>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
