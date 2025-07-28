import { DefaultTheme } from 'styled-components';

type StatusColor = {
  background: string;
  color: string;
  border: string;
};

export const getStatusColor = (status: string, theme: DefaultTheme): StatusColor => {
  switch (status) {
    case '포기':
      return {
        background: theme.colors.secondary.subtle,
        color: theme.colors.secondary.darker,
        border: theme.colors.secondary.darker,
      };
    case '정답':
      return {
        background: theme.colors.sementic.standard300,
        color: theme.colors.brand.darker,
        border: theme.colors.brand.darker,
      };
    case '이해완료':
      return {
        background: theme.colors.sementic.light400,
        color: theme.colors.text500,
        border: theme.colors.text500,
      };
    case '오답':
      return {
        background: theme.colors.tertiary.subtle,
        color: theme.colors.tertiary.darker,
        border: theme.colors.tertiary.darker,
      };
    default:
      return {
        background: theme.colors.tertiary.subtle,
        color: theme.colors.tertiary.darker,
        border: theme.colors.tertiary.darker,
      };
  }
};
