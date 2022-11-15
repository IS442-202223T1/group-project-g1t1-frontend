import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

export default function ResponseText({ statusCode, message }) {
	if (statusCode === 200) {
		return (
			<div>
				<p className="bg-green-100">Your booking was successful. Enjoy your trip!</p>
			</div>
		);
	}
	if (statusCode === 409) {
		return (
			<div>
				<p className="bg-redPri text-white">
					Unable to book this attraction as there are not enough passes on that day.
				</p>
			</div>
		);
	}
	if (statusCode === 400) {
		return (
			<div>
				<p className="bg-redPri text-white">{message}</p>
			</div>
		);
	}
	return null;
}
