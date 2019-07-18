import { IModifierActions, ModifierAction, IModifier, IOsmiumModifiers } from '../runtime-interfaces';

function getModifier(actions: ModifierAction[]): IModifier {
	let value = '';
	const listeners = [];

	const execute = (modifierValue: string) => {
		if (modifierValue !== undefined) {
			value = modifierValue;
			actions.forEach((action): void => action(modifierValue));
			listeners.forEach((listner): void => listner());
		}

		return value;
	};

	execute.addListner = (func, getProps: () => {}) => {
		listeners.push(() => func(getProps()));
		return (): void => {
			listeners.filter((listner) => listner !== func);
		};
	};

	return execute;
}

export const enhaceModifier = (modifierActions: IModifierActions, enhacedModifiers: IOsmiumModifiers): IOsmiumModifiers => {
	for (const [fullModifierName, actions] of Object.entries(modifierActions)) {
		const [componentUid, modifierName]: string[] = fullModifierName.split('.');

		if (enhacedModifiers[componentUid]) {
			enhacedModifiers[componentUid][modifierName] = getModifier(actions);
		} else {
			enhacedModifiers[componentUid] = {
				[modifierName]: getModifier(actions),
			};
		}
	}
	return enhacedModifiers;
};

export const createModifier = (modifiers: IModifierActions, modifier: string, modifierAction: ModifierAction) => {
	if (modifiers[modifier]) {
		modifiers[modifier].push(modifierAction);
	} else {
		modifiers[modifier] = [modifierAction];
	}
};
